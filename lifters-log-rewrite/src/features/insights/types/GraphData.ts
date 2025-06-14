type GraphPoint = {
    date: string;
    value: number;
    subValue?: number;
}

type GraphData = {
    data: Array<GraphPoint>
}

export default GraphData