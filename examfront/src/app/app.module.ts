import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { authInterceptorProviders } from './service/auth.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NormalUserProfileComponent } from './pages/user/normal-user-profile/normal-user-profile.component';
import { ShowQuizzesComponent } from './pages/user/show-quizzes/show-quizzes.component';
import { QuizInstructionComponent } from './pages/user/quiz-instruction/quiz-instruction.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { QuizResultComponent } from './pages/user/quiz-result/quiz-result.component';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, NgxUiLoaderRouterModule, NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION, } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "blue",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "red",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "ball-spin-clockwise",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
};


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    HomeComponent,
    SigninComponent,
    DashboardComponent,
    UserDashboardComponent,
    UserProfileComponent,
    SidebarComponent,
    ViewCategoriesComponent,
    AddCategoryComponent,
    ViewQuizzesComponent,
    AddQuizComponent,
    UpdateQuizComponent,
    ViewQuestionsComponent,
    AddQuestionComponent,
    UpdateQuestionComponent,
    NormalUserProfileComponent,
    ShowQuizzesComponent,
    QuizInstructionComponent,
    StartQuizComponent,
    QuizResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    CKEditorModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatStepperModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatExpansionModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
      
    }),
    // NgxUiLoaderRouterModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }


