import React from 'react';
import renderer from 'react-test-renderer';
import SeriesEnds from '../template';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

describe( 'SeriesEnds', () => {
	test( 'should render component', () => {
		const component = renderer.create(
			<SeriesEnds
				className="test-class"
				onSeriesEndsAfterTimesChange={ jest.fn() }
				onSeriesEndsChange={ jest.fn() }
				onSeriesEndsOnDateChange={ jest.fn() }
				seriesEndsAfterTimes={ 1 }
				seriesEnds={ options.SERIES_ENDS_OPTIONS[0] }
				seriesEndsOnDate={ 'September 7, 2019' }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should render on postfix', () => {
		const component = renderer.create(
			<SeriesEnds
				onSeriesEndsAfterTimesChange={ jest.fn() }
				onSeriesEndsChange={ jest.fn() }
				onSeriesEndsOnDateChange={ jest.fn() }
				seriesEndsAfterTimes={ 1 }
				seriesEnds={ options.SERIES_ENDS_OPTIONS[0] }
				seriesEndsOnDate={ 'September 7, 2019' }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should render after postfix', () => {
		const component = renderer.create(
			<SeriesEnds
				onSeriesEndsAfterTimesChange={ jest.fn() }
				onSeriesEndsChange={ jest.fn() }
				onSeriesEndsOnDateChange={ jest.fn() }
				seriesEndsAfterTimes={ 1 }
				seriesEnds={ options.SERIES_ENDS_OPTIONS[1] }
				seriesEndsOnDate={ 'September 7, 2019' }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should render no postfix', () => {
		const component = renderer.create(
			<SeriesEnds
				onSeriesEndsAfterTimesChange={ jest.fn() }
				onSeriesEndsChange={ jest.fn() }
				onSeriesEndsOnDateChange={ jest.fn() }
				seriesEndsAfterTimes={ 1 }
				seriesEnds={ options.SERIES_ENDS_OPTIONS[2] }
				seriesEndsOnDate={ 'September 7, 2019' }
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
