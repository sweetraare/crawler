import { Injectable } from '@nestjs/common';
import axios from 'axios';

import * as cheerio from 'cheerio';

const URL_TO_CRAWL = 'https://news.ycombinator.com/';

@Injectable()
export class CrawlerService {
  async fetchEntries() {
    const { data } = await axios.get(URL_TO_CRAWL);
    // console.log('data', data);
    this.parseHTML(data);
  }

  private parseHTML(html: string) {
    const $ = cheerio.load(html);

    $('tr.athing').each((_, row) => {
      const title = $('.title>.titleline>a', row).first().text();
      const textNumber = $('.title>.rank', row).text(); // it's similar to 30. might need to remove the final dot
      const number = parseInt(textNumber);

      const nextRow = $(row).next('.subtext');
      // console.log('nextRow', nextRow);

      const points = nextRow.find('.score').text();

      // TODO: Find a way to get comments

      // const comments = nextRow.find('a').last().text();
      const comments = nextRow.children().last().text();

      console.log(
        title,
        number,
        typeof number,
        textNumber,
        'points',
        points,
        'comments',
        comments,
      );
    });
  }
}
