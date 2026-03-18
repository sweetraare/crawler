const mockRun = jest.fn();
const mockAll = jest.fn();

const mockPrepare = jest.fn().mockReturnValue({
  run: mockRun,
  all: mockAll,
});

export const mockDb = {
  prepare: mockPrepare,
  run: mockRun,
  all: mockAll,
};
