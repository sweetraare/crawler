import { Test, TestingModule } from '@nestjs/testing';
import { CrawlerService } from './crawler.service';
import axios from 'axios';
import { New } from 'src/common/interfaces/new.interface';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockCrawlHTML = `
<html>
  <body>
    <table>
      <tr class="athing" id="1">
        <td class="title">
          <span class="rank">1.</span>
          <span class="titleline">
            <a href="https://alex.com">Long long long long text</a>
          </span>
        </td>
      </tr>
      <tr>
        <td class="subtext">
          <span class="score" id="score_47419525">1 point</span>
          by
          <a href="https://alex.com" class="hnuser">Alex Ulloa</a>
          <span class="age" title="2026-03-17T22:59:59 1773788399">
            <a href="https://alex.com">0 minutes ago</a>
          </span>
          <span id="unv_47419525"></span>
          |
          <a href="https://alex.com">hide</a>
          |
          <a href="https://alex.com" class="hnpast">past</a>
          |
          <a href="https://alex.com">discuss</a>
        </td>
      </tr>
      <tr class="athing" id="2">
        <td class="title">
          <span class="rank">2.</span>
          <span class="titleline"><a href="https://alex.com">short title</a></span
          >
        </td>
      </tr>
      <tr>
        <td class="subtext">
          <span class="subline">
            <span class="score" id="score_47419294">20 points</span> by
            <a href="https://alex.com" class="hnuser">Another Alex</a>
            <span class="age" title="2026-03-17T22:36:03 1773786963">
              <a href="https://alex.com">24 minutes ago</a>
            </span>
            <span id="unv_47419294"></span> |
            <a href="https://alex.com">hide</a> |
            <a
              href="https://alex.com"
              class="hnpast"
              >past</a>
            | <a href="https://alex.com">4&nbsp;comments</a></span>
        </td>
      </tr>
    </table>
  </body>
</html>

`;

describe('CrawlerService', () => {
  let service: CrawlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrawlerService],
    }).compile();

    service = module.get<CrawlerService>(CrawlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not make real HTTP requests', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockCrawlHTML });
    await service.fetchEntries();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('should parse news from HTML', () => {
    const newsList: New[] = service['parseHTML'](mockCrawlHTML);
    expect(newsList.length).toBe(2);
  });

  it('should parse titles correctly', () => {
    const newsList: New[] = service['parseHTML'](mockCrawlHTML);
    expect(newsList[0].title).toEqual('Long long long long text');
    expect(newsList[1].title).toEqual('short title');
  });

  it('should parse index correctly', () => {
    const newsList: New[] = service['parseHTML'](mockCrawlHTML);
    expect(newsList[0].index).toEqual(1);
    expect(newsList[1].index).toEqual(2);
  });

  it('should parse points correctly ', () => {
    const newsList: New[] = service['parseHTML'](mockCrawlHTML);
    expect(newsList[0].points).toEqual(1);
    expect(newsList[1].points).toEqual(20);
  });

  it('should parse comments correctly even when no comments', () => {
    const newsList: New[] = service['parseHTML'](mockCrawlHTML);
    expect(newsList[0].comments).toEqual(0);
    expect(newsList[1].comments).toEqual(4);
  });
});
