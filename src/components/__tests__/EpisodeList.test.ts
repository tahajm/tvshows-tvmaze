import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import type { Episode } from '@/types/shows';

import EpisodeList from '../EpisodeList.vue';

const MOCK_EPISODES: Episode[] = [
  {
    id: 1,
    name: 'First',
    number: 1,
    season: 58,
    airdate: '',
    runtime: 59,
    rating: { average: 4 },
    image: { medium: '', original: '' },
    summary: '',
  },
  {
    id: 2,
    name: 'second',
    number: 1,
    season: 65,
    airdate: '',
    runtime: 60,
    rating: { average: 4 },
    image: { medium: '', original: '' },
    summary: '',
  },
];

const mountOptions = {
  props: { episodes: MOCK_EPISODES },
};

describe('episodeList', () => {
  it('renders two sesons', () => {
    const wrapper = mount(EpisodeList, mountOptions);
    const seasonButtons = wrapper.findAll('button');
    expect(seasonButtons[0].text()).toBe('58');
    expect(seasonButtons[1].text()).toBe('65');

    expect(seasonButtons[0].attributes()['aria-pressed']).toBe('true');
    expect(seasonButtons[1].attributes()['aria-pressed']).toBe('false');
  });
  it('select second season would show correct episode', async () => {
    const wrapper = mount(EpisodeList, mountOptions);
    const secondButton = wrapper
      .findAll('button')
      .find((b) => b.text() === '65');

    await secondButton?.trigger('click');

    expect(secondButton?.attributes()['aria-pressed']).toBe('true');

    const episodeList = wrapper.find('ol[aria-label="Episodes"]');
    expect(episodeList.text()).toContain(MOCK_EPISODES[1].name);
    expect(episodeList.text()).not.toContain(MOCK_EPISODES[0].name);
  });
});
