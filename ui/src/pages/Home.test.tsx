import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

describe('Home component', () => {
    test('renders without errors', () => {
        // Component is rendered correctly
        render(<Home />);
    });

    test('loads file on file input change', () => {
        render(<Home />);
        const fileInput = screen.getByLabelText('file-input');
        const file = new File(['Hello, World!'], 'test.txt', { type: 'text/plain' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        // File is loaded and displayed correctly
        expect(screen.getByText('test.txt')).toBeInTheDocument();
        expect(screen.getByText('Hello, World!')).toBeInTheDocument();
    });

    test('converts text on button click', async () => {
        // Mock processText function from services
        jest.mock('../services/text', () => ({
            processText: jest.fn(() => Promise.resolve('Converted text')),
        }));

        render(<Home />);
        const convertButton = screen.getByText('Convert');

        fireEvent.click(convertButton);

        await screen.findByText('Converted text');

        // Converted text is displayed
        expect(screen.getByText('Converted text')).toBeInTheDocument();
    });
});