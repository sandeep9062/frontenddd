import CollectTheGoldGame from  "../../components/CatchTheGoldGame"

export default function FunZone() {
  return (
    <main className="pt-16 px-4 bg-gray-100 dark:bg-[#0F111A] text-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🏆 Collect the Gold</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Tap as many Gold Bars as you can in 30 seconds!
      </p>
      <CollectTheGoldGame />
    </main>
  );
}
