import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import Table from '../index';
import {User} from '../../../modals';
import theme from '../../../theme';

describe('<Table />', () => {
  const mockData: User[] = [
    {
      uid: '1',
      name: 'John',
      rank: 1,
      bananas: 5,
      stars: 16,
      subscribed: true,
      lastDayPlayed: '2018-10-22',
      longestStreak: 2,
    },
    {
      uid: '2',
      name: 'Alice',
      rank: 2,
      bananas: 10,
      stars: 16,
      subscribed: false,
      lastDayPlayed: '2019-10-22',
      longestStreak: 2,
    },
  ];

  it('renders Table correctly with provided data', () => {
    const {getByText} = render(<Table data={mockData} />);

    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Rank')).toBeTruthy();
    expect(getByText('Number of Bananas')).toBeTruthy();
    expect(getByText('Is Searched User')).toBeTruthy();
    expect(getByText('John')).toBeTruthy();
  });

  it('correctly highlights the selected user in the table', () => {
    const selectedUser = {
      uid: '1',
      name: 'John',
      rank: 1,
      bananas: 5,
      stars: 16,
      subscribed: true,
      lastDayPlayed: '2018-10-22',
      longestStreak: 2,
    };
    const {getByText} = render(
      <Table data={mockData} selectedUser={selectedUser} />,
    );
    const highlightedCell = getByText('John');
    expect(highlightedCell).toHaveStyle({color: theme.colors.venetianRed});
    expect(highlightedCell.props.style.color).toBe(theme.colors.venetianRed);
  });
  it('displays correct number of items and data in the table', () => {
    const {getByText, getAllByTestId} = render(<Table data={mockData} />);
    expect(getByText('John')).toBeTruthy();
    expect(getByText('Alice')).toBeTruthy();
    const tableRows = getAllByTestId('table-row');
    expect(tableRows.length).toEqual(mockData.length);
  });

  it('Table component matches snapshot', () => {
    const component = renderer.create(<Table data={mockData} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
