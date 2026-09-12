import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { cn } from "@/lib/utils";

export default function CTable({
  column,
  colConfig,
  classNameHeader,
  className,
  styleTextCol,
  styleTextHead,
  onClick,
  isLoading = false,
  select,
  setSelect,
}: ICTable) {
  const handleSelectAll = () => {
    if (select && setSelect) {
      if (select.length === column.length) {
        setSelect([]);
      } else {
        const allIds = column.map((row) => row.id);
        setSelect(allIds);
      }
    }
  };

  const handleRowSelect = (id: string) => {
    if (select && setSelect) {
      setSelect((prev: string[]) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    }
  };

  return (
    <div className={className}>
      <Table>
        <TableHeader className={classNameHeader}>
          <TableRow>
            {select && setSelect && (
              <TableHead className="sticky left-0 bg-background z-10">
                <input
                  type="checkbox"
                  checked={select.length === column.length && column.length > 0}
                  onChange={handleSelectAll}
                />
              </TableHead>
            )}
            {colConfig.map((col, id) => (
              <TableHead
                key={id}
                className={cn(
                  "font-medium text-base text-foreground",
                  styleTextHead,
                  {
                    "text-right": colConfig.length - 1 === id,
                  },
                )}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {column?.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {select && setSelect && (
                <TableCell className="sticky left-0 bg-background">
                  <input
                    type="checkbox"
                    checked={select.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                  />
                </TableCell>
              )}
              {colConfig.map((col, colIndex) => (
                <TableCell
                  onClick={() => onClick?.(row)}
                  key={`${rowIndex}-${colIndex}`}
                  className={cn(styleTextCol, {
                    "text-right": colConfig.length - 1 === colIndex,
                  })}
                >
                  {col.render(row, rowIndex)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        {isLoading && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={colConfig.length}>
                {isLoading ? <p className="text-center">Loading...</p> : null}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
