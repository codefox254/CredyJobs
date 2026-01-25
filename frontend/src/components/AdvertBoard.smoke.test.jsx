
// Global fetch mock for Jest
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: 1, title: 'Test Advert', description: 'Test Desc', image: 'job_images/test.jpg' },
      { id: 2, title: 'Another Advert', description: 'Another Desc', image: 'job_images/test2.jpg' }
    ])
  })
);

test('renders AdvertBoard and displays adverts', async () => {
  render(<AdvertBoard />);
  expect(await screen.findByText(/Advertise with CredyJobs/i)).toBeInTheDocument();
  expect(await screen.findByPlaceholderText(/Search adverts/i)).toBeInTheDocument();
  expect(await screen.findByAltText(/Test Advert/i)).toBeInTheDocument();
  expect(await screen.findByAltText(/Another Advert/i)).toBeInTheDocument();
});

test('search bar filters adverts', async () => {
  render(<AdvertBoard />);
  const searchInput = await screen.findByPlaceholderText(/Search adverts/i);
  fireEvent.change(searchInput, { target: { value: 'Another' } });
  expect(await screen.findByAltText(/Another Advert/i)).toBeInTheDocument();
  expect(screen.queryByAltText(/Test Advert/i)).not.toBeInTheDocument();
});
