import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';


import { Chart, ChartOptions } from 'chart.js/auto';
import { DataService } from '../data.service';

interface BudgetItem {
  budget: number;
  title: string;
}

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit, OnDestroy {
  public data_p = {
    data: [] as number[], 
    backgroundColor: [
      '#ffcd56',
      '#ff0000',
      '#0000ff',
      '#4d5791',
      '#a52a2a',
      '#8a2be2',
      '#ffebcd',
      '#deb887',
    ],
    labels: [] as string[], 
  };

  private myPieChart: Chart | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((res) => {
        console.log(res);
        for (const item of res) {
          this.data_p.data.push(item.budget);
          this.data_p.labels.push(item.title);
        }
        this.createChart();
      });
  }

  createChart() {
    setTimeout(() => {
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      console.log(ctx);
      if (!ctx) {
        console.error('Canvas element not found.');
        return;
      }

      if (this.myPieChart) {
        this.myPieChart.destroy();
      }

      try {
        this.myPieChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: this.data_p.labels,
            datasets: [{
              label: 'Budget',
              data: this.data_p.data,
              backgroundColor: this.data_p.backgroundColor,
            }]
          },
          options: {
            responsive: false,
            maintainAspectRatio: false,
          } as ChartOptions
        });
      } catch (error) {
        console.error('Error chart:', error);
      }
    });
  }

  ngAfterViewInit(): void {  }

  ngOnDestroy(): void {
    if (this.myPieChart) {
      this.myPieChart.destroy();
    }
  }
}