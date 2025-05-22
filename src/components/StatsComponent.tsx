
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatsCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  change?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export const StatsCard = ({
  title,
  value,
  description,
  icon,
  change,
  className
}: StatsCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold">{value}</h3>
              {change && (
                <span 
                  className={cn(
                    "text-xs font-medium inline-flex items-center",
                    change.positive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {change.positive ? "+" : "-"}{Math.abs(change.value)}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {icon && (
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

type StatsRowData = {
  key: string;
  label: string;
  value: number | string;
}

type ComparisonTableProps = {
  title: string;
  data: StatsRowData[];
  change?: StatsRowData[];
}

export const ComparisonTable = ({
  title,
  data,
  change
}: ComparisonTableProps) => {
  return (
    <div className="overflow-hidden">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="bg-white rounded-md border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Métrica</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              {change && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Variação</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.key}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.label}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{row.value}</td>
                {change && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    {change.find(c => c.key === row.key) ? (
                      <span className={cn(
                        Number(change.find(c => c.key === row.key)?.value) >= 0 
                          ? "text-green-600" 
                          : "text-red-600"
                      )}>
                        {Number(change.find(c => c.key === row.key)?.value) >= 0 ? "+" : ""}
                        {change.find(c => c.key === row.key)?.value}%
                      </span>
                    ) : "-"}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type MetricChartProps = {
  title: string;
  total: number;
  max: number;
  label: string;
  percentage: number;
  className?: string;
}

export const MetricChart = ({
  title,
  total,
  max,
  label,
  percentage,
  className
}: MetricChartProps) => {
  return (
    <Card className={cn(className)}>
      <CardContent className="p-6">
        <h3 className="font-medium text-sm text-muted-foreground mb-2">{title}</h3>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold">
            {total}
          </span>
          <span className="text-muted-foreground text-sm mb-1">/ {max} {label}</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2 bg-muted rounded-full">
            <div 
              className="h-full bg-primary rounded-full transition-all" 
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground">
            {percentage}% utilizado
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
