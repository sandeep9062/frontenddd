import Papa from 'papaparse';

// Function to load and parse CSV data
export const loadProductsFromCSV = async (csvFilePath) => {
  try {
    const response = await fetch(csvFilePath);
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false, // Keep all fields as strings initially
        skipEmptyLines: 'greedy', // Skip completely empty lines
        transformHeader: (header) => {
          // Normalize headers to match our expected format (including Wix export fields)
          const headerMap = {
            // Standard fields
            'name': 'name',
            'product name': 'name',
            'title': 'name',
            'description': 'description',
            'price': 'price',
            'cost': 'price', // Wix uses 'cost' field
            'amount': 'price',
            'image': 'image',
            'photo': 'image',
            'picture': 'image',
            'category': 'category',
            'type': 'category',
            'rating': 'rating',
            'stars': 'rating',
            'brand': 'brand',
            'manufacturer': 'brand',
            'sku': 'sku',
            'id': 'id',
            'product id': 'id',
            
            // Wix specific fields
            'productimageurl': 'image',
            'collection': 'category',
            'handled': 'handled',
            'field type': 'fieldType',
            'ribbon': 'ribbon',
            'surcharge': 'surcharge',
            'visible': 'visible',
            'discountmode': 'discountMode',
            'discountvalue': 'discountValue',
            'inventory': 'inventory',
            'weight': 'weight',
            
            // Additional info fields (Wix has multiple additional info fields)
            'additionalinfotitle1': 'additionalInfoTitle1',
            'additionalinfodescription1': 'additionalInfoDescription1',
            'additionalinfotitle2': 'additionalInfoTitle2',
            'additionalinfodescription2': 'additionalInfoDescription2',
            'additionalinfotitle3': 'additionalInfoTitle3',
            'additionalinfodescription3': 'additionalInfoDescription3',
            
            // Product options (Wix has multiple product option fields)
            'productoptionname1': 'productOptionName1',
            'productoptiontype1': 'productOptionType1',
            'productoptions1': 'productOptions1',
          };
          
          const normalizedHeader = header.toLowerCase().trim().replace(/\s+/g, '');
          return headerMap[normalizedHeader] || normalizedHeader;
        },
        transform: (value, header) => {
          // Clean up data
          if (header === 'price') {
            // Remove currency symbols and convert to number
            const cleanPrice = value.replace(/[₹$€£,]/g, '').trim();
            return cleanPrice ? parseFloat(cleanPrice) : 0;
          }
          if (header === 'rating') {
            return value ? parseFloat(value) : 0;
          }
          if (header === 'visible') {
            // Convert Wix visible field to boolean
            return value && (value.toLowerCase() === 'true' || value === '1');
          }
          if (header === 'inventory') {
            return value ? parseInt(value) : 0;
          }
          if (header === 'weight') {
            return value ? parseFloat(value) : 0;
          }
          return value ? value.trim() : '';
        },
        complete: (results) => {
          if (results.errors.length > 0) {
            // Filter out TooManyFields errors as they're expected with Wix exports
            const significantErrors = results.errors.filter(error => 
              !error.message.includes('TooManyFields') && 
              !error.message.includes('FieldMismatch'));
            
            if (significantErrors.length > 0) {
              console.warn('CSV parsing warnings:', significantErrors);
            }
          }
          
          console.log(`Raw CSV data: ${results.data.length} rows`);
          if (results.data.length > 0) {
            console.log('Available CSV columns:', Object.keys(results.data[0]));
            console.log('Sample row:', results.data[0]);
          }
          
          // Process and enhance the data
          const processedProducts = results.data
            .filter(product => {
              // Only include visible products (Wix exports include hidden products)
              return product.visible !== false && product.visible !== 'false' && product.name && product.name.trim();
            })
            .map((product, index) => {
              // Handle image URL - provide fallback for missing images
              let imageUrl = product.image;
              if (!imageUrl || imageUrl.trim() === '') {
                // Use category-based fallback images
                const category = (product.category || product.collection || '').toLowerCase();
                if (category.includes('toothpaste')) {
                  imageUrl = require('../assets/Tooth Whitening.png');
                } else if (category.includes('mouthwash')) {
                  imageUrl = require('../assets/Mouth Wash.png');
                } else if (category.includes('brush')) {
                  imageUrl = require('../assets/Kids Dentistry.png');
                } else {
                  imageUrl = require('../assets/Ayurvedic Dental.png');
                }
              }

              return {
                id: product.sku || product.id || `product-${index + 1}`,
                name: product.name || 'Unknown Product',
                description: product.description || 'No description available',
                price: typeof product.price === 'number' && product.price > 0 ? `₹${product.price}` : product.price || '₹0',
                image: imageUrl,
                category: product.category || product.collection || 'General',
                brand: product.brand || 'Unknown',
                rating: product.rating || 4.0,
                sku: product.sku || '',
                ribbon: product.ribbon || '',
                inventory: product.inventory || 0,
                weight: product.weight || 0,
                visible: product.visible !== false,
                dateAdded: new Date(),
                // Enhanced fields for filtering
                numericPrice: typeof product.price === 'number' ? product.price : 0,
                dentalProblems: [], // Will be mapped based on category or description
              };
            });
          
          resolve(processedProducts);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading CSV file:', error);
    throw error;
  }
};

// Function to map categories to dental problems
export const mapCategoryToDentalProblems = (category, description = '') => {
  const categoryLower = category.toLowerCase();
  const descLower = description.toLowerCase();
  
  const problemMappings = {
    'toothpaste': {
      'sensitive': ['sensitivity', 'teethWhitening'],
      'whitening': ['teethWhitening'],
      'kids': ['toothdecay'],
      'herbal': ['gumDisease', 'badBreath'],
      'default': ['toothdecay', 'badBreath']
    },
    'mouthwash': {
      'sensitive': ['sensitivity', 'gumDisease'],
      'whitening': ['teethWhitening', 'badBreath'],
      'antiseptic': ['gumDisease', 'bleedingGums'],
      'default': ['gumDisease', 'badBreath', 'bleedingGums']
    },
    'toothbrush': {
      'kids': ['toothdecay', 'gumDisease'],
      'soft': ['sensitivity', 'bleedingGums'],
      'electric': ['gumDisease', 'toothdecay'],
      'default': ['toothdecay', 'gumDisease']
    },
    'floss': ['gumDisease', 'bleedingGums'],
    'tongue cleaner': ['badBreath'],
    'gum paint': ['gumDisease', 'bleedingGums'],
    'default': ['toothdecay', 'badBreath']
  };
  
  // Find matching category
  for (const [key, problems] of Object.entries(problemMappings)) {
    if (categoryLower.includes(key)) {
      if (typeof problems === 'object') {
        // Check for specific subtypes
        for (const [subtype, subProblems] of Object.entries(problems)) {
          if (subtype !== 'default' && (categoryLower.includes(subtype) || descLower.includes(subtype))) {
            return subProblems;
          }
        }
        return problems.default || [];
      }
      return problems;
    }
  }
  
  return problemMappings.default;
};
