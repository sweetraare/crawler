import { Injectable } from '@nestjs/common';
import { New } from '../common/interfaces/new.interface';
import { FilterType } from './dto/filter-query.dto';

const textOnlyRegex = /[a-zA-Z0-9]/;
const longWordsCount = 5;

@Injectable()
export class FilterService {
  countWords(title: string): number {
    return title.split(/\s+/).filter((word) => textOnlyRegex.test(word)).length;
  }

  filterNews(news: New[], filterType: FilterType): New[] {
    const isLong = filterType === FilterType.long;

    const filteredNews = news.filter((newO) =>
      isLong
        ? this.countWords(newO.title) > longWordsCount
        : this.countWords(newO.title) < longWordsCount,
    );

    const sortedNews = isLong
      ? filteredNews.sort((a, b) => b.points - a.points)
      : filteredNews.sort((a, b) => b.comments - a.comments);

    return sortedNews;
  }
}
