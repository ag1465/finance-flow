import { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface CategoryData {
  category: string;
  spentAmount: number;
  budgetedAmount: number;
}

interface CategoryBarChartProps {
  data: CategoryData[];
}

const CategoryBarChart: FC<CategoryBarChartProps> = ({ data }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(data.map(d => d.category));
    y.domain([0, d3.max(data, d => Math.max(d.spentAmount, d.budgetedAmount)) as number]).nice();

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Draw budgeted amount bars
    g.selectAll('.bar-budget')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar-budget')
      .attr('x', d => x(d.category)!)
      .attr('y', d => y(d.budgetedAmount))
      .attr('height', d => height - y(d.budgetedAmount))
      .attr('width', x.bandwidth())
      .attr('fill', '#A5B4FC');

    // Draw spent amount bars on top
    g.selectAll('.bar-spent')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar-spent')
      .attr('x', d => x(d.category)!)
      .attr('y', d => y(d.spentAmount))
      .attr('height', d => height - y(d.spentAmount))
      .attr('width', x.bandwidth())
      .attr('fill', '#4F46E5');

    g.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll('text')
      .attr('fill', 'white')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold');

    g.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(null, 's'))
      .selectAll('text')
      .attr('fill', 'white')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold');

    g.selectAll('.domain').attr('stroke', 'white');
    g.selectAll('.tick line').attr('stroke', 'white');

    const legend = g
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 14)
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(['Spent Amount', 'Budgeted Amount'])
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(0,${i * 20})`);

    legend
      .append('rect')
      .attr('x', width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', (d, i) => (i === 0 ? '#4F46E5' : '#A5B4FC'));

    legend
      .append('text')
      .attr('x', width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .attr('fill', 'white')
      .text(d => d);
  }, [data]);

  return <svg ref={ref} width="100%" height="500px" />;
};

export default CategoryBarChart;