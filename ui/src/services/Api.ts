// Copyright 2024 Iguazio
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { User } from '@shared/types';
import { DataSource } from '@shared/types/dataSource';
import { Project } from '@shared/types/project';
import { Session } from '@shared/types/session';
import { Query } from '@shared/types/workflow';
import axios, { AxiosResponse } from 'axios';


class ApiClient {
  private client

  constructor() {
    this.client = axios.create({
      baseURL: '/api',
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: false
    })
  }

  private handleResponse(response: AxiosResponse) {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error('Error:', response.data.error || 'Unknown error');
      return null;
    }
  }

  // eslint-disable-next-line
  private handleError(error: any) {
    console.error('Request failed:', error.message);
    return null;
  }

  // USERS

  async getUsers() {
    try {
      const response = await this.client.get(`/users`)
      return this.handleResponse(response)
    } catch (error) {
      this.handleError(error as Error)
    }
  }

  async getUser(username: string) {
    try {
      const response = await this.client.get(`/users/${username}`);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createUser(user: User) {
    try {
      const response = await this.client.post('/users', user);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateUser(user: Partial<User>) {
    try {
      const response = await this.client.put(`/users/${user.name}`, user);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteUser(username: string) {
    try {
      const response = await this.client.delete(`/users/${username}`);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // SESSIONS

  async getSessions(username?: string) {
    try {
      const response = await this.client.get(`/users/${username}/sessions`)
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error as Error)
    }
  }

  async getSession(username: string, id: string,) {
    try {
      const response = await this.client.get(`users/${username}/sessions/${id}`)
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error as Error)
    }
  }

  async createSession(username: string, session: Session) {
    try {
      const response = await this.client.post(`users/${username}/sessions`, session)
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error as Error)
    }
  }

  async updateSession(username: string, session: Session) {
    try {
      const response = await this.client.put(`/users/${username}/sessions/${session.name}`, session)
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error as Error)
    }
  }

  async deleteSession(username: string, session: Session) {
    try {
      const response = await this.client.delete(`/users/${username}/sessions/${session.uid}`)
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error as Error)
    }
  }

  // WORKFLOWS

  async getWorkflow(projectId: string, workflowId: string, query: Query) {
    try {
      const response = await this.client.post(
        `/projects/${projectId}/workflows/${workflowId}`, // is it project ID or name?
        query
      )
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error as Error)
    }
  }

  async inferWorkflow(projectId: string, workflowId: string, query: Query) {
    try {
      const response = await this.client.post(
        `/projects/${projectId}/workflows/${workflowId}/infer`,
        query
      )
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error as Error)
    }
  }

  // PROJECTS

  async getProjects(params?: { name?: string; owner_name?: string; mode?: string; labels?: string[] }) {
    try {
      const response = await this.client.get(`/projects`, { params });
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getProject(projectName: string) {
    try {
      const response = await this.client.get(`/projects/${projectName}`);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createProject(project: Project) {
    try {
      const response = await this.client.post(`/projects`, project);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateProject(project: Project) {
    try {
      const response = await this.client.put(`/projects/${project.name}`, project);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }


  async deleteProject(projectName: string) {
    try {
      const response = await this.client.delete(`/projects/${projectName}`);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // DATASOURCES

  async createDataSource(projectName: string, dataSource: DataSource) {
    try {
      const response = await this.client.post(`/projects/${projectName}/data_sources`, dataSource);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }


  async getDataSource(projectName: string, uid: string) {
    try {
      const response = await this.client.get(`/projects/${projectName}/data_sources/${uid}`);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }


  async updateDataSource(projectName: string, dataSource: DataSource) {
    try {
      const response = await this.client.put(`/projects/${projectName}/data_sources/${dataSource.name}`, dataSource);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }


  async deleteDataSource(projectName: string, uid: string) {
    try {
      const response = await this.client.delete(`/projects/${projectName}/data_sources/${uid}`);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }


  async getDataSources(projectName: string, params?: { name?: string; version?: string; data_source_type?: string; labels?: string[]; mode?: string }) {
    try {
      const response = await this.client.get(`/projects/${projectName}/data_sources`, { params });
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // eslint-disable-next-line
  async ingestDocument(projectName: string, uid: string, ingestData: { loader: string; path: string; metadata?: any; version?: string; from_file: boolean }) {
    try {
      const response = await this.client.post(`/projects/${projectName}/data_sources/${uid}/ingest`, ingestData);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
}


function getClient() {
  return new ApiClient()
}

const Client = getClient()

export default Client
