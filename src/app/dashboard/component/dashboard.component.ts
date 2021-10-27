import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../service/dashboard.service';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { isLabeledStatement } from 'typescript';
import { Dashboard } from '../service/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('commentsCanvas')
  private commentsCanvas!: ElementRef;
  @ViewChild('likesCanvas')
  private likesCanvas!: ElementRef;
  @ViewChild('visitsCanvas')
  private visitsCanvas!: ElementRef;
  @ViewChild('commentsPredictionCanvas')
  private commentsPredictionCanvas!: ElementRef;
  @ViewChild('likesPredictionCanvas')
  private likesPredictionCanvas!: ElementRef;
  @ViewChild('visitsPredictionCanvas')
  private visitsPredictionCanvas!: ElementRef;
  
  

  titulo = 'Evolução de comentários por mês';
  labels: any;
  data: any;


  commentsChart: any;
  likesChart: any;
  visitsChart: any;
  commentsPredictionChart: any;
  likesPredictionChart: any;
  visitsPredictionChart: any;

  commentsDate: any;
  commentsSum: any;
  commentsPredictionDate: any;
  commentsPredictionSum: any;
  
  likesDate: any;
  likesSum: any;
  likesPredictionDate: any;
  likesPredictionSum: any;

  visitsDate: any;
  visitsSum: any;
  visitsPredictionSum: any;

  sumComments: any;

  predictSumRefined: any;
  predictSumLikesRefined: any;
  predictSumVisitsRefined: any;

  predictDate: any;
  predictSum: any;

  userData: any = {
    averageUsersAge: null,
    commentsGrowth: null,
    commentsPrediction: null,
    likesGrowth: null,
    likesPrediction: null,
    sumComments: null,
    sumLikes: null,
    sumVisits: null,
    visitsGrowth: null
  };

  
  


  constructor(
    private dashService: DashboardService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.dashService.ngOnInit();
    this.dashService.getValidation().subscribe(
      (response) => { },
      (err) => {
        if (err.status == 401) {
          this.router.navigate(['']);
        } else if (err.status == 500) {
          this.router.navigate(['/erro']);
        }
      }
    );

    this.dashService.getDashBoardData().subscribe(
      (response: Dashboard) => {
        this.userData = response;
        
        this.commentsDate = this.userData.commentsPrediction.map((commentsprediction: any) => commentsprediction.date)
        this.commentsSum = this.userData.commentsGrowth.map((comments: any) => comments.sum)
        
        this.likesDate = this.userData.likesPrediction.map((likesprediction: any) => likesprediction.date)
        this.likesSum = this.userData.likesGrowth.map((likes: any) => likes.sum)

        this.visitsDate = this.userData.visitsPrediction.map((visitsprediction: any) => visitsprediction.date)
        this.visitsSum = this.userData.visitsGrowth.map((visits: any) => visits.sum)

        
        this.commentsPredictionSum = this.userData.commentsPrediction.map((commentsprediction: any) => commentsprediction.prediction)

        this.likesPredictionSum = this.userData.likesPrediction.map((likesprediction: any) => likesprediction.prediction)

        this.visitsPredictionSum = this.userData.visitsPrediction.map((visitsprediction: any) => visitsprediction.prediction)

      
        this.commentsGrowthGraph(this.commentsDate, this.commentsSum, this.commentsPredictionSum);
        this.likesGrowthGraph(this.likesDate, this.likesSum, this.likesPredictionSum);
        this.visitsGrowthGraph(this.visitsDate, this.visitsSum, this.visitsPredictionSum);
      
        
      },
      (err) => {
        throw err;
      }
    );
  }

  private commentsGrowthGraph(commentsDate: string[], commentsSum: number[], predictSum: number[]) {

    this.predictSumRefined = predictSum.map(function(item) { return item == -1 ? null : item; });

    this.predictSumRefined[2] = commentsSum[commentsSum.length-1]



    this.commentsChart = new Chart(this.commentsCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: commentsDate,
        datasets: [
          {
            label: 'Evolução de comentários',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            data: commentsSum
          },
          {
            label: 'Predição',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(22,140,142,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            data: this.predictSumRefined
          }
        ]
      }
    });
  }

  private likesGrowthGraph(likesDate: string[], likesSum: number[], likesPredictionSum: number[]) {

    this.predictSumLikesRefined = likesPredictionSum.map(function(item) { return item == -1 ? null : item; });

    this.predictSumLikesRefined[2] = likesSum[likesSum.length-1]

    this.likesChart = new Chart(this.likesCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: likesDate,
        datasets: [
          {
            label: 'Evolução de curtidas',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            data: likesSum
          },
          {
            label: 'Predição',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(22,140,142,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            data: this.predictSumLikesRefined
          }
        ]
      }
    });
  }

  private visitsGrowthGraph(visitsDate: string[], visitsSum: number[], predictSum: number[]) {

    this.predictSumVisitsRefined = predictSum.map(function(item) { return item == -1 ? null : item; });

    this.predictSumVisitsRefined[2] = visitsSum[visitsSum.length-1]

    this.visitsChart = new Chart(this.visitsCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: visitsDate,
        datasets: [
          {
            label: 'Evolução de visitas',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            data: visitsSum
          },
          {
            label: 'Predição',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(22,140,142,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            data: this.predictSumVisitsRefined
          }
        ]
      }
    });
  }
}
