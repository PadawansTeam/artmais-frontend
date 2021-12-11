import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../service/dashboard.service';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { isLabeledStatement } from 'typescript';
import { Dashboard } from '../service/dashboard';
import { type } from 'os';

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
  @ViewChild('videoCanvas')
  private videoCanvas!: ElementRef;
  @ViewChild('audioCanvas')
  private audioCanvas!: ElementRef;
  @ViewChild('pictureCanvas')
  private pictureCanvas!: ElementRef;


  commentsChart: any;
  likesChart: any;
  visitsChart: any;
  audioChart: any;
  videoChart: any;
  pictureChart: any;
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
  sumVideoGrowth: any;

  predictSumRefined: any;
  predictSumLikesRefined: any;
  predictSumVisitsRefined: any;

  predictDate: any;
  predictSum: any;

  videoCommentsDate: any;
  videoCommentsSum: any;
  videoLikesDate: any;
  videoLikesSum: any;

  audioCommentsDate: any;
  audioCommentsSum: any;
  audioLikesDate: any;
  audioLikesSum: any;

  pictureCommentsDate: any;
  pictureCommentsSum: any;
  pictureLikesDate: any;
  pictureLikesSum: any;


  userData: any = {
    averageUsersAge: null,
    commentsGrowth: null,
    commentsPrediction: null,
    likesGrowth: null,
    likesPrediction: null,
    sumComments: null,
    sumLikes: null,
    sumVisits: null,
    visitsGrowth: null,
    sumVideoGrowth: null,
    videoCommentsGrowth: null,
    audioCommentsGrowth: null,
    picturesCommentsGrowth: null,
    videoLikesGrowth: null,
    audioLikesGrowth: null,
    picturesLikesGrowth: null
  };

  loaderOn: boolean = false;

  constructor(
    private dashService: DashboardService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loaderOn = true;
    this.dashService.ngOnInit();
    this.dashService.getValidation().subscribe(
      (response) => { },
      (err) => {
        if (err.status == 401) {
          this.loaderOn = false;
          this.router.navigate(['']);
        } else if (err.status == 500) {
          this.loaderOn = false;
          this.router.navigate(['/erro']);
        }
      }
    );

    function sum(accumulator: any, a: any) {
      return accumulator + a;
    }

    this.dashService.getDashBoardData().subscribe(
      (response: Dashboard) => {
        this.userData = response;
        
        if (this.userData.commentsPrediction){
          this.commentsDate = this.userData.commentsPrediction.map((commentsprediction: any) => commentsprediction.date)
          this.commentsSum = this.userData.commentsGrowth.map((comments: any) => comments.sum)  
          this.commentsPredictionSum = this.userData.commentsPrediction.map((commentsprediction: any) => commentsprediction.prediction)
          this.commentsGrowthGraph(this.commentsDate, this.commentsSum, this.commentsPredictionSum);
        }
        
        if (this.userData.likesPrediction){
          this.likesDate = this.userData.likesPrediction.map((likesprediction: any) => likesprediction.date)
          this.likesSum = this.userData.likesGrowth.map((likes: any) => likes.sum)
          this.likesPredictionSum = this.userData.likesPrediction.map((likesprediction: any) => likesprediction.prediction)
          this.likesGrowthGraph(this.likesDate, this.likesSum, this.likesPredictionSum);
        }
        
        if (this.userData.visitsPrediction){
          this.visitsDate = this.userData.visitsPrediction.map((visitsprediction: any) => visitsprediction.date)
          this.visitsSum = this.userData.visitsGrowth.map((visits: any) => visits.sum)
          this.visitsPredictionSum = this.userData.visitsPrediction.map((visitsprediction: any) => visitsprediction.prediction)
          this.visitsGrowthGraph(this.visitsDate, this.visitsSum, this.visitsPredictionSum);
        }

        if (this.userData.videoCommentsGrowth){
          this.videoCommentsDate = this.userData.videoCommentsGrowth.map((videoGrowth: any) => videoGrowth.date)
          this.videoCommentsSum = this.userData.videoCommentsGrowth.map((videoGrowth: any) => videoGrowth.sum)
          this.videoLikesSum = this.userData.videoLikesGrowth.map((videoGrowth: any) => videoGrowth.sum)
          
          this.userData.videoCommentsGrowth = this.videoCommentsSum.reduce(sum, 0) + this.videoLikesSum.reduce(sum, 0);

          this.videosGrowthGraph(this.videoCommentsDate, this.videoCommentsSum, this.videoLikesSum);
        }

        if (this.userData.audioCommentsGrowth){
          this.audioCommentsDate = this.userData.audioCommentsGrowth.map((audioGrowth: any) => audioGrowth.date)
          this.audioCommentsSum = this.userData.audioCommentsGrowth.map((audioGrowth: any) => audioGrowth.sum)
          this.audioLikesSum = this.userData.audioLikesGrowth.map((audioGrowth: any) => audioGrowth.sum)
        
          this.userData.audioCommentsGrowth = this.audioCommentsSum.reduce(sum, 0) + this.audioLikesSum.reduce(sum, 0);

          this.audioGrowthGraph(this.audioCommentsDate, this.audioCommentsSum, this.audioLikesSum);
        }
        
        if (this.userData.picturesCommentsGrowth){
          this.pictureCommentsDate = this.userData.picturesCommentsGrowth.map((pictureGrowth: any) => pictureGrowth.date)
          this.pictureCommentsSum = this.userData.picturesCommentsGrowth.map((pictureGrowth: any) => pictureGrowth.sum)
          this.pictureLikesSum = this.userData.picturesLikesGrowth.map((pictureGrowth: any) => pictureGrowth.sum)
        
          this.userData.picturesCommentsGrowth = this.pictureCommentsSum.reduce(sum, 0) + this.pictureLikesSum.reduce(sum, 0);

          this.pictureGrowthGraph(this.pictureCommentsDate, this.pictureCommentsSum, this.pictureLikesSum);
        }
      },
      (err) => {
        throw err;
      }
    );
  }

  private commentsGrowthGraph(commentsDate: string[], commentsSum: number[], predictSum: number[]) {

    this.predictSumRefined = predictSum.map(function(item) { return item == -1 ? null : item; });

    this.predictSumRefined[commentsSum.length-1] = commentsSum[commentsSum.length-1]


    if (commentsSum.length == 1){
      this.commentsChart = new Chart(this.commentsCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: commentsDate,
          datasets: [
            {
              label: 'Quantidade de comentários',
              fill: false,
              lineTension: 0.1,
              backgroundColor: '#701ec6',
              borderColor: '#701ec6',
              borderCapStyle: 'butt',
              data: commentsSum
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    precision: 0
                }
            }]
          }
        }
      });
    }
    else{

      this.commentsChart = new Chart(this.commentsCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: commentsDate,
          datasets: [
            {
              label: 'Quantidade de comentários',
              fill: false,
              lineTension: 0.1,
              backgroundColor: '#701ec6',
              borderColor: '#701ec6',
              borderCapStyle: 'butt',
              data: commentsSum
            },
            {
              label: 'Previsão',
              fill: false,
              lineTension: 0.1,
              backgroundColor: '#969b9b',
              hoverBackgroundColor: '#353535',
              borderColor: '#969b9b',
              hoverBorderColor:'#353535',
              borderCapStyle: 'butt',
              data: this.predictSumRefined,
              borderDash: [5, 5],
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    precision: 0
                }
            }]
          }
        }
      });
    }
    this.loaderOn = false;
  }

  private likesGrowthGraph(likesDate: string[], likesSum: number[], likesPredictionSum: number[]) {

    this.predictSumLikesRefined = likesPredictionSum.map(function(item) { return item == -1 ? null : item; });

    this.predictSumLikesRefined[likesSum.length-1] = likesSum[likesSum.length-1]

    if (likesSum.length == 1){
      this.likesChart = new Chart(this.likesCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: likesDate,
          datasets: [
            {
              label: 'Quantidade de curtidas',
              fill: false,
              lineTension: 0.1,
              backgroundColor: '#701ec6',
              borderColor: '#701ec6',
              borderCapStyle: 'butt',
              data: likesSum
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    precision: 0
                }
            }]
          }
        }
      });
    }
    else{
      this.likesChart = new Chart(this.likesCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: likesDate,
          datasets: [
            {
              label: 'Quantidade de curtidas',
              fill: false,
              lineTension: 0.1,
              backgroundColor: '#701ec6',
              borderColor: '#701ec6',
              borderCapStyle: 'butt',
              data: likesSum
            },
            {
              label: 'Previsão',
              fill: false,
              lineTension: 0.1,
              backgroundColor: '#969b9b',
              hoverBackgroundColor: '#353535',
              hoverBorderColor:'#353535',
              borderColor: '#969b9b',
              borderCapStyle: 'butt',
              data: this.predictSumLikesRefined,
              borderDash: [5, 5]
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    precision: 0
                }
            }]
          }
        }
      });
    }
    this.loaderOn = false;
  }

  private visitsGrowthGraph(visitsDate: string[], visitsSum: number[], predictSum: number[]) {

    this.predictSumVisitsRefined = predictSum.map(function(item) { return item == -1 ? null : item; });

    this.predictSumVisitsRefined[visitsSum.length-1] = visitsSum[visitsSum.length-1]

    if (visitsSum.length == 1){
      this.visitsChart = new Chart(this.visitsCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: visitsDate,
          datasets: [
            {
              label: 'Quantidade de visitas',
              fill: true,
              lineTension: 0.1,
              backgroundColor: '#701ec6',
              borderColor: '#701ec6',
              borderCapStyle: 'butt',
              data: visitsSum
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    precision: 0
                }
            }]
          }
        }
      });
    }
    else{
      this.visitsChart = new Chart(this.visitsCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: visitsDate,
          datasets: [
            {
              label: 'Quantidade de visitas',
              fill: false,
              lineTension: 0.1,
              backgroundColor: '#701ec6',
              borderColor: '#701ec6',
              borderCapStyle: 'butt',
              data: visitsSum
            },
            {
              
              label: 'Previsão',
              fill: false,
              lineTension: 0.1,
              backgroundColor: '#969b9b',
              hoverBackgroundColor: '#353535',
              hoverBorderColor:'#353535',
              borderColor: '#969b9b',
              borderCapStyle: 'round',
              data: this.predictSumVisitsRefined,
              borderDash: [5, 5],
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    precision: 0
                }
            }]
          }
        }
      });
    }
    this.loaderOn = false;
  }  

  private videosGrowthGraph(videoCommentsDate: string[], videoCommentsSum: number[], 
                            videoLikesSum: number[]) {

    if (videoCommentsDate.length == 1){
      this.videoChart = new Chart(this.videoCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: videoCommentsDate,
          datasets: [
            {
              label: 'Quantidade de visitas',
              fill: true,
              lineTension: 0.1,
              backgroundColor: '#701ec6',
              borderColor: '#701ec6',
              borderCapStyle: 'butt',
              data: videoCommentsSum
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    precision: 0
                }
            }]
          }
        }
      });
    }
    else{
      this.videoChart = new Chart(this.videoCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: videoCommentsDate,
          datasets: [
            {
              label: 'Quantidade de comentários',
              fill: false,
              lineTension: 0.1,
              backgroundColor: '#701ec6',
              borderColor: '#701ec6',
              borderCapStyle: 'butt',
              data: videoCommentsSum
            },
            {
              
              label: 'Quantidade de curtidas',
              fill: false,
              lineTension: 0.1,
              backgroundColor: '#969b9b',
              hoverBackgroundColor: '#353535',
              hoverBorderColor:'#353535',
              borderColor: '#969b9b',
              borderCapStyle: 'round',
              data: videoLikesSum
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    precision: 0
                }
            }]
          }
        }
      });
    }
    this.loaderOn = false;
  }

  private audioGrowthGraph(audioCommentsDate: string[], audioCommentsSum: number[], 
                           audioLikesSum: number[]) {

    this.audioChart = new Chart(this.audioCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: audioCommentsDate,
          datasets: [
            {
              label: 'Quantidade de comentários',
              fill: false,
              lineTension: 0.1,
              backgroundColor: '#701ec6',
              borderColor: '#701ec6',
              borderCapStyle: 'butt',
              data: audioCommentsSum
            },
            {
              
              label: 'Quantidade de curtidas',
              fill: false,
              lineTension: 0.1,
              backgroundColor: '#969b9b',
              hoverBackgroundColor: '#353535',
              hoverBorderColor:'#353535',
              borderColor: '#969b9b',
              borderCapStyle: 'round',
              data: audioLikesSum
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    precision: 0
                }
            }]
          }
        }
      });
    this.loaderOn = false;
  }

  private pictureGrowthGraph(pictureCommentsDate: string[], pictureCommentsSum: number[], 
                           pictureLikesSum: number[]) {

    this.pictureChart = new Chart(this.pictureCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: pictureCommentsDate,
          datasets: [
            {
              label: 'Quantidade de comentários',
              fill: false,
              lineTension: 0.1,
              backgroundColor: '#701ec6',
              borderColor: '#701ec6',
              borderCapStyle: 'butt',
              data: pictureCommentsSum
            },
            {
              
              label: 'Quantidade de curtidas',
              fill: false,
              lineTension: 0.1,
              backgroundColor: '#969b9b',
              hoverBackgroundColor: '#353535',
              hoverBorderColor:'#353535',
              borderColor: '#969b9b',
              borderCapStyle: 'round',
              data: pictureLikesSum
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    precision: 0
                }
            }]
          }
        }
      });
    this.loaderOn = false;
  }
}
