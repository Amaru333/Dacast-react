export interface BaseItemAnalytics {
    data: number[],
    label?: string,
    color: string
    type?: 'line' | 'bar'
}

export interface BaseOptions {
    stack?: boolean,
    fill?: boolean,
    curve?: number
}

export interface LineChartProps {
    lines: BaseItemAnalytics[],
    labels: string[],
    title: string,
    options?: BaseOptions
}

export interface BarChartProps {
    dataSets: BaseItemAnalytics[],
    labels: string[],
    title: string,
    type?: 'horizontal' | 'vertical'
}
