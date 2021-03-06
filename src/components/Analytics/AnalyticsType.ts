export interface BaseItemAnalytics {
    data: number[],
    label?: string,
    color: string
    type?: 'line' | 'bar',
    yAxisPosition?: 'left' | 'right'
}

export interface BaseOptions {
    stack?: boolean,
    fill?: boolean,
    curve?: number,
    isTime?: boolean,
    rightYAxes?: boolean
}

export interface LineChartProps {
    lines: BaseItemAnalytics[],
    labels: (string | number)[],
    title: string,
    options?: BaseOptions;
    step?: number;
}

export interface BarChartProps {
    dataSets: BaseItemAnalytics[],
    labels: (string | number)[],
    options?: BaseOptions
    title: string,
    type?: 'horizontal' | 'vertical',
    id?: string,
    unit?:string,
    unitRight?: string,
    step?: number
}