import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { WorkProfileComponent } from './work-profile/work-profile.component';
import { RecruiterComponent } from './recruiter/recruiter.component';
import { AboutComponent } from './about/about.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { PortofolioComponent } from './portofolio/portofolio.component';
import { WildcardComponent } from './wildcard/wildcard.component';
import { RecruiterPortfolioComponent } from './recruiter-portfolio/recruiter-portfolio.component';

export const routes: Routes = [
    { path: '', component: LandingpageComponent },  // Default route
    { path: 'about', component: AboutComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'login', component: LoginComponent },
    { path: 'portfolio', component: PortofolioComponent },
    { path: 'recruiter', component: RecruiterComponent },
    { path: 'user', component: UserComponent },
    { path: 'r-portfolio', component: RecruiterPortfolioComponent },
    { path: 'work-profile', component: WorkProfileComponent },
    { path: '**', component: WildcardComponent }
];

