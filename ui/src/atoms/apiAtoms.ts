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

import Client from '@services/Api';
import { User } from '@shared/types';
import { atom } from 'jotai';

export const usersAtom = atom<User[]>([]);

export const usersLoadingAtom = atom<boolean>(false);

export const usersErrorAtom = atom<string | null>(null);

export const fetchUsersAtom = atom(
  async (get) => {
    get(usersLoadingAtom);
    const users = await Client.getUsers();
    return users.data;
  }
);

export const usersWithFetchAtom = atom(
  (get) => get(usersAtom),
  async (_get, set) => {
    set(usersLoadingAtom, true);
    set(usersErrorAtom, null);
    try {
      const users = await Client.getUsers();
      set(usersAtom, users.data);
    } catch (error) {
      set(usersErrorAtom, 'Failed to fetch users');
    } finally {
      set(usersLoadingAtom, false);
    }
  }
);
