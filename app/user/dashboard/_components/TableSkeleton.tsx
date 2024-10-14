const TableSkeleton = () => {
  const skeletonRows = Array.from({ length: 5 }); // Example: 5 rows

  return (
    <table className="w-full bg-white !rounded-t-xl">
      <thead className="bg-slate-200 text-slate-800 !rounded-t-xl">
        <tr>
          <th className="text-left p-4">Status</th>
          <th className="text-left p-4">Date</th>
          <th className="text-left p-4">Doctor</th>
          <th className="text-left p-4"></th>
        </tr>
      </thead>
      <tbody>
        {skeletonRows.map((_, index) => (
          <tr key={index} className="animate-pulse">
            <td className="flex items-center gap-3 p-4">
              <div className="rounded-full w-8 h-8 bg-gray-300"></div>
              <div className="h-4 bg-gray-300 rounded-md w-24"></div>
            </td>
            <td className="p-4">
              <div className="h-4 bg-gray-300 rounded-md w-24"></div>
            </td>
            <td className="flex items-center gap-3 p-4">
              <div className="rounded-full w-8 h-8 bg-gray-300"></div>
              <div className="h-4 bg-gray-300 rounded-md w-40"></div>
            </td>
            <td className="p-4">
              <div className="h-4 bg-gray-300 rounded-md w-8"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TableSkeleton;
