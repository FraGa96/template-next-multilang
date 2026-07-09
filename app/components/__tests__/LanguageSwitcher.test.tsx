import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LanguageSwitcher from '../LanguageSwitcher';

const refreshMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    refreshMock.mockClear();
    global.fetch = vi.fn().mockResolvedValue({ ok: true });
  });

  it('renders the provided label and supported locales', () => {
    render(<LanguageSwitcher label="Language" />);

    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'EN' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'ES' })).toBeInTheDocument();
  });

  it('posts the new locale and refreshes the router on change', async () => {
    render(<LanguageSwitcher label="Language" />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'es' } });

    await waitFor(() => expect(refreshMock).toHaveBeenCalledTimes(1));

    expect(global.fetch).toHaveBeenCalledWith('/api/locale', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ locale: 'es' }),
    }));
  });
});
