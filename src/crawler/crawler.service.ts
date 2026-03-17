import { Injectable } from '@nestjs/common';
import axios from 'axios';

import * as cheerio from 'cheerio';
import { parseTextToNumber } from 'src/common/utils/parser.utils';

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
      const textNumber = $('.title>.rank', row).text();
      const number = parseInt(textNumber);

      const nextRow = $(row).next();
      const pointsText = nextRow.find('.score').text(); //413 points needs to be separated
      const commentsText = nextRow.find('a').last().text(); // 100 comments  needs to be separated

      const points = parseTextToNumber(pointsText.split(' ')?.[0]);
      const comments = parseTextToNumber(commentsText.split(' ')?.[0]);

      console.log(title, number, textNumber, points, comments);
    });
  }
}
