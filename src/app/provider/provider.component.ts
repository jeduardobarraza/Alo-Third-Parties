import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { ProviderService } from '../services/providers.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { get } from 'lodash';
import CommonCells from 'src/utils/common-cell';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ProviderEditComponent } from './provider-edit/provider-edit.component';

export interface DialogData {
  providerId: string;
  confirm: boolean;
  Name: string;
}

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent implements AfterViewInit {
  public loading = true;
  public columnDefs: ColDef[] = [];
  confirm: boolean = false;

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  tableColumnsProperties = {
    providertId: {
      ...this.defaultColDef,
    },
    providerName: {
      ...this.defaultColDef,
    },
    providerType: {
      ...this.defaultColDef,
    },
    status: {
      ...this.defaultColDef,
    },
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  tableColumns = {
    providersTable: {
      tlProviderId: 'ProveedorId',
      tlProviderName: 'Nombre Proveedor',
      tlProviderType: 'Tipo Proveedor',
      status: 'Estado',
    },
  };

  constructor(private api: ProviderService, private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    setTimeout(async () => {
      await this.buildTableColumns();
      await this.loadProviders();
    });
  }

  onCellClicked(e: any) {
    //this.loading = true;
    console.log('cellClicked', e);
    if (!e) return;
    const {
      data,
      colDef: { colId },
    } = e;
    // if (colId === 'btnEdit') this.getSet(data);
    // if (colId === 'choose') this.selectedSet(data.type, data);
    if (colId === 'btnDelete') console.log('Boton eliminar');
    //this.openDialog('500ms', '100ms', data.projectId, data.tlProjectName);
    if (e.colDef.colId === 'btnLogistic') {
      console.log('Boton logistic');
      //this.logisticProject(e.data.type, e.data);
    }
    if (
      e.colDef.colId != 'btnLogistic' &&
      e.colDef.colId != 'btnArchive' &&
      e.colDef.colId != 'btnDelete'
    ) {
      this.editProvider(e.data);
    }
  }

  buildTableColumns = async () => {
    const fields = [
      'tlProviderId',
      'tlProviderName',
      'tlProviderType',
      'status',
    ];
    const columnDefs: ColDef[] = [];

    await fields.map(async (field) => {
      const headerName = get(this.tableColumns.providersTable, field);
      // const headerName = await this.i18.t(
      //   `tableColumns.projectsTable.${field}`
      // );
      const columnProperties = get(this.tableColumnsProperties, field, {});
      const column = {
        ...columnProperties,
        colId: field,
        headerName,
        field,
      };
      columnDefs.push(column);
    });

    // const logisticColumn = {
    //   colId: 'btnLogistic',
    //   sortable: true,
    //   width: 48,
    //   resizable: true,
    //   cellRenderer: CommonCells.logisticCellRenderer,
    //   tooltipValueGetter: function getTooltip() {
    //     return 'constructionLogistic';
    //   },
    // };
    // columnDefs.push(logisticColumn);

    const archiveColumn = {
      colId: 'btnArchive',
      sortable: true,
      width: 48,
      resizable: true,
      cellRenderer: CommonCells.archiveCellRenderer,
      tooltipValueGetter: function getTooltip() {
        return 'file';
      },
    };
    columnDefs.push(archiveColumn);

    const deleteColumn = {
      colId: 'btnDelete',
      sortable: true,
      width: 48,
      resizable: true,
      cellRenderer: CommonCells.deleteCellRenderer,
      tooltipValueGetter: function getTooltip() {
        return 'delete';
      },
    };
    columnDefs.push(deleteColumn);
    this.columnDefs = columnDefs;
  };

  loadProviders = async () => {
    const providerList = await this.api.getProviders();
    this.agGrid.api.setRowData(providerList);
    this.loading = false;
    console.log('providersList', providerList);
  };

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    providerID: string,
    providerName: string
  ): void {
    const dialogRef = this.dialog.open(DialogAnimations, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        providerId: providerID,
        confirm: this.confirm,
        Name: providerName,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { confirm: boolean; providerId: string }) => {
        console.log('The dialog was closed');
        console.log(result);
        //console.log(this.confirm);
        if (result.confirm == true) this.deleteProvider(result.providerId);
      });
  }

  async deleteProvider(providerId: string) {
    await this.api.deleteProvider(providerId);
    window.location.reload();
    this.loading = false;
  }

  editProvider = async (obj: any = null) => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      obj,
    };

    dialogConfig.height = '750px';
    dialogConfig.width = '1800px';
    dialogConfig.panelClass = 'custom-modal';
    const dialogRef = this.dialog.open(ProviderEditComponent, dialogConfig);
  };
}

@Component({
  selector: 'dialog-animations',
  templateUrl: 'dialog-animations.html',
})
export class DialogAnimations {
  constructor(
    public dialogRef: MatDialogRef<DialogAnimations>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onConfirmClick(): void {
    this.data.confirm = true;
    // console.log(this.data);
    this.dialogRef.close(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close(this.data);
  }
}
