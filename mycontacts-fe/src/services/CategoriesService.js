import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async listCategories(orderBy = 'asc') {
    const categories = await this.httpClient.get(`/categories?orderBy=${orderBy}`);

    return categories.map(CategoryMapper.toDomain);
  }
}

export default new CategoriesService();
