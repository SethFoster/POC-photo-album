const mockedAxios = jest.createMockFromModule("axios");

mockedAxios.create = jest.fn(() => mockedAxios);

mockedAxios.get = jest.fn(() => Promise.resolve({ data: [] }));

export default mockedAxios;
