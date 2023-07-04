import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NormalUserProfileComponent } from './pages/user/normal-user-profile/normal-user-profile.component';
import { QuizInstructionComponent } from './pages/user/quiz-instruction/quiz-instruction.component';
import { ShowQuizzesComponent } from './pages/user/show-quizzes/show-quizzes.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuardGuard } from './service/admin-guard.guard';
import { UserGuardGuard } from './service/user-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuardGuard],

    //call component with in a component using another router-outlet
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'profile',
        component: UserProfileComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'view-categories',
        component: ViewCategoriesComponent,
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },
      {
        path: 'view-quizzes/:cId/:title',
        component: ViewQuizzesComponent,
      },
      {
        path: 'quiz/:qId',
        component: UpdateQuizComponent,
      },
      {
        path: 'view-questions/:qId/:title',
        component: ViewQuestionsComponent,
      },
      {
        path: 'add-question/:qId/:title',
        component: AddQuestionComponent,
      },
      {
        path: 'update-question/:queId',
        component: UpdateQuestionComponent,
      }
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [UserGuardGuard],
    children: [
      {
        path: 'profile',
        component: NormalUserProfileComponent,
      },
      {
        path: 'quizzes/:cId/:title',
        component: ShowQuizzesComponent,
      },
      {
        path: 'quiz-intsruction/:q_id',
        component: QuizInstructionComponent
      }
    ]
  },
  {
    path: 'start-quiz/:q_id',
    component: StartQuizComponent,
    canActivate: [UserGuardGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
