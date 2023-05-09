import { Injectable } from '@angular/core';
import { IProvider } from '../interfaces/provider.interface';
import { ApiHelperService } from './api-helper.service';

const PROVIDER_CONTROLLER = 'provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  createProperty: any;
  constructor(private apiHelper: ApiHelperService) {}

  ///////////////Projects

  getProviders = () => this.apiHelper.getAsync(PROVIDER_CONTROLLER);

  getProviderById = (providerId: string) =>
    this.apiHelper.getAsync(PROVIDER_CONTROLLER, { path: providerId });


  createProvider = (body: IProvider) => {
    const result = this.apiHelper.postAsync(PROVIDER_CONTROLLER, {
      body
    });
    return result;
  };

  updateProvider = (providerId: string, body: IProvider) => {
    const result = this.apiHelper.updateAsync(PROVIDER_CONTROLLER, {
      path: providerId,
      body
    });
    return result;
  };

  deleteProvider = (providerId: string) =>
    this.apiHelper.deleteAsync(PROVIDER_CONTROLLER, {
      path: '' + providerId
    });

}
