import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { questions } from './data/questions';

describe('App scavenger hunt mode', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows separate Start Bingo and Start Scavenger buttons on the start screen', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: /start bingo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start scavenger/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start card deck/i })).toBeInTheDocument();
  });

  it('starts scavenger mode with a checklist and progress meter', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /start scavenger/i }));

    expect(screen.getByRole('heading', { name: /scavenger hunt/i })).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(24);
  });

  it('uses the same question set as bingo by listing 24 prompts and excluding FREE SPACE', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /start scavenger/i }));

    expect(screen.getAllByRole('checkbox')).toHaveLength(24);
    expect(screen.queryByText(/free space/i)).not.toBeInTheDocument();
  });

  it('updates progress when a checklist item is checked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /start scavenger/i }));

    expect(screen.getByText(/0\s*\/\s*24/i)).toBeInTheDocument();

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);

    expect(screen.getByText(/1\s*\/\s*24/i)).toBeInTheDocument();
    expect(firstCheckbox).toBeChecked();
  });

  it('starts card deck shuffle mode and draws a random question on tap', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /start card deck/i }));

    expect(screen.getByRole('heading', { name: /card deck shuffle/i })).toBeInTheDocument();
    expect(screen.getByText(/cards drawn:\s*0/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /draw a random question card/i }));

    const drawnText = screen.getByTestId('deck-card-text').textContent ?? '';
    expect(questions).toContain(drawnText);
    expect(screen.getByText(/cards drawn:\s*1/i)).toBeInTheDocument();
  });
});