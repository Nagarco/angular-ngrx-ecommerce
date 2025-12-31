import { ClassConstructor, plainToClass } from 'class-transformer';

export class LocalStorage {
  static get<T = unknown>(key: string, Model?: ClassConstructor<T>): T | null {
    const data = localStorage.getItem(key);

    if (data === null) {
      return null;
    }

    let parsedData: any;
    try {
      parsedData = JSON.parse(data);
    } catch (e) {
      parsedData = data;
    }
    return Model ? plainToClass(Model, parsedData, { strategy: 'exposeAll' }) : parsedData;
  }

  static set(key: string, value: unknown): boolean {
    if (value === undefined || value === null) {
      return false;
    }

    try {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
