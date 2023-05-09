import { Component } from '@angular/core';
import { ProviderService } from '../services/providers.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { get } from 'lodash';
import CommonCells from 'src/utils/common-cell';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent {

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true
  };
  tableColumnsProperties = {
    providertId: {
      ...this.defaultColDef
    },
    providerName: {
      ...this.defaultColDef
    },
    providerType: {
      ...this.defaultColDef
    },
    status: {
      ...this.defaultColDef
    }
  };

  tableColumns = {
    providersTable: {
      tlProviderId: 'ProveedorId',
      tlProviderName: 'Nombre Proveedor',
      tlProviderType: 'Tipo Proveedor',
      status: 'Estado'
    },
    modulesTable: {}
  };

  public columnDefs: ColDef[] = [];

  constructor(
    private api: ProviderService
  ){}

  buildTableColumns = async () => {
    const fields = ['tlProjectName', 'tlClientName', 'articles', 'responsible'];
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
        field
      };
      columnDefs.push(column);
    });

    const logisticColumn = {
      colId: 'btnLogistic',
      sortable: true,
      width: 48,
      resizable: true,
      cellRenderer: CommonCells.logisticCellRenderer,
      tooltipValueGetter: function getTooltip() {
        return 'constructionLogistic';
      }
    };
    columnDefs.push(logisticColumn);

    const archiveColumn = {
      colId: 'btnArchive',
      sortable: true,
      width: 48,
      resizable: true,
      cellRenderer: CommonCells.archiveCellRenderer,
      tooltipValueGetter: function getTooltip() {
        return 'file';
      }
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
      }
    };
    columnDefs.push(deleteColumn);
    this.columnDefs = columnDefs;
  };
}
