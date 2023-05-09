import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProviderComponent } from './provider/provider.component';
import { ToastrService } from 'ngx-toastr';

const PROVIDERS_VIEW = 'PROVIDERS';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alo-third-parties';

  @ViewChild('providersCmp')
  providersComponent!: ProviderComponent;

  VIEWS_LIST = [PROVIDERS_VIEW];
  selectedView = '';
  addProviderTooltip = 'Crear Proveedor';
  constructor(private dialog: MatDialog, private toast: ToastrService) {}

  ngAfterViewInit(): void {
    setTimeout(async () => {
      this.selectedView = PROVIDERS_VIEW;
      // this.viewLibraryTooltip = await this.i18.t('button.viewLibrary');
      // this.addProjectTooltip = await this.i18.t('button.addProject');
    });
  }

  onAddClick = () => {
    if (this.selectedView === PROVIDERS_VIEW) this.getProvider();
  };

  getProvider = async (project: any = null) => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 'P',
      project
    };

    dialogConfig.height = '800px';
    dialogConfig.width = '1250px';
    dialogConfig.panelClass = 'custom-modal';
    const dialogRef = this.dialog.open(ProviderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async (data) => {
      console.log(data);
      if (data.refresh) {
        console.log('entró al if');
        //await this.projectsComponent.loadProjects();
      }
    });
  };

}
