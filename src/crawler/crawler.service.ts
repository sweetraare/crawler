import { Injectable } from '@nestjs/common';
import axios from 'axios';

const URL_TO_CRAWL = 'https://news.ycombinator.com/';

@Injectable()
export class CrawlerService {
  async fetchEntries() {
    const { data } = await axios.get(URL_TO_CRAWL);
    console.log('data', data);
  }
}
