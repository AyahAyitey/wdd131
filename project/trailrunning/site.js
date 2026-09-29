const trailRoutes = [
  {
    name: 'Rattlesnake Ledge',
    region: 'North Bend, Washington',
    distance: 4,
    elevation: 1160,
    difficulty: 'Moderate',
    description: 'A popular forest climb to a rocky overlook above Rattlesnake Lake.',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=900&q=78',
    imageAlt: 'Runner moving along a wooded mountain trail',
    source: 'https://www.wta.org/go-hiking/hikes/rattlesnake-ledge'
  },
  {
    name: 'Ben Johnson Trail',
    region: 'Muir Woods, California',
    distance: 2.64,
    elevation: 369,
    difficulty: 'Easy',
    description: 'A shaded redwood trail climbing from Muir Woods toward Mount Tamalpais.',
    image: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=900&q=78',
    imageAlt: 'Sunlight falling across a forest trail',
    source: 'https://www.parksconservancy.org/trails/ben-johnson-trail'
  },
  {
    name: 'Skyline Trail',
    region: 'Mount Rainier National Park, Washington',
    distance: 5.5,
    elevation: 1700,
    difficulty: 'Hard',
    description: 'A high-elevation loop near Paradise with expansive mountain views.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=78',
    imageAlt: 'Hikers following a mountain trail through open country',
    source: 'https://www.nps.gov/mora/planyourvisit/skyline-trail.htm'
  },
  {
    name: 'Dipsea Trail',
    region: 'Mill Valley, California',
    distance: 9.44,
    elevation: null,
    difficulty: 'Very strenuous',
    description: 'A very strenuous route from Mill Valley to Stinson Beach through Muir Woods.',
    image: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=900&q=78',
    imageAlt: 'Sunlight falling across a rugged trail in the hills',
    source: 'https://www.parksconservancy.org/trails/dipsea-trail'
  },
  {
    name: 'Angels Landing',
    region: 'Zion National Park, Utah',
    distance: 5.4,
    elevation: 1488,
    difficulty: 'Hard',
    description: 'A strenuous exposed route requiring a permit; not a beginner trail.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=78',
    imageAlt: 'Steep rocky peaks rising above a canyon landscape',
    source: 'https://www.nps.gov/zion/planyourvisit/angels-landing-hiking-permits.htm'
  }
];

const favoritesKey = 'trailrunning-favorites';
const plannerKey = 'trailrunning-weekly-plan';

function readFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(favoritesKey) ?? '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function renderRoutes(routes, favorites) {
  const routeList = document.querySelector('#route-list');
  const resultCount = document.querySelector('#results-count');
  if (!routeList || !resultCount) return;

  resultCount.textContent = `${routes.length} ${routes.length === 1 ? 'route' : 'routes'} found`;
  if (routes.length === 0) {
    routeList.innerHTML = `<p class="empty-state">No routes match those filters. Try widening your search.</p>`;
    return;
  }

  routeList.innerHTML = routes.map((route) => {
    const isFavorite = favorites.includes(route.name);
    return `<article class="route-card">
      <img class="route-image" src="${route.image}" alt="${route.imageAlt}" loading="lazy" width="900" height="600">
      <div class="route-content">
        <span class="route-region">${route.region}</span>
        <h3>${route.name}</h3>
        <p>${route.description} <a href="${route.source}" target="_blank" rel="noopener noreferrer">Official route info</a></p>
        <div class="route-stats"><span>${route.distance} mi</span><span>${route.elevation === null ? 'Elevation not listed' : `${route.elevation.toLocaleString()} ft gain`}</span></div>
        <div class="route-actions"><span class="difficulty">${route.difficulty}</span><button class="favorite-button" type="button" data-favorite="${route.name}" aria-pressed="${isFavorite}">${isFavorite ? 'Saved' : 'Save route'}</button></div>
      </div>
    </article>`;
  }).join('');
}

function initializeTrailFinder() {
  const filters = document.querySelector('#route-filters');
  if (!filters) return;

  const difficultyFilter = document.querySelector('#difficulty-filter');
  const distanceFilter = document.querySelector('#distance-filter');
  const sortFilter = document.querySelector('#sort-filter');

  function updateRoutes() {
    const chosenDifficulty = difficultyFilter.value;
    const maximumDistance = distanceFilter.value;
    const sortBy = sortFilter.value;
    let visibleRoutes = trailRoutes.filter((route) => {
      const matchesDifficulty = chosenDifficulty === 'all' || route.difficulty === chosenDifficulty;
      const matchesDistance = maximumDistance === 'all' || route.distance <= Number(maximumDistance);
      return matchesDifficulty && matchesDistance;
    });

    visibleRoutes = [...visibleRoutes].sort((first, second) => {
      if (sortBy === 'elevation') return first.elevation - second.elevation;
      if (sortBy === 'name') return first.name.localeCompare(second.name);
      return first.distance - second.distance;
    });
    renderRoutes(visibleRoutes, readFavorites());
  }

  filters.addEventListener('change', updateRoutes);
  filters.addEventListener('reset', () => window.setTimeout(updateRoutes, 0));
  document.querySelector('#route-list').addEventListener('click', (event) => {
    const favoriteButton = event.target.closest('[data-favorite]');
    if (!favoriteButton) return;
    const routeName = favoriteButton.dataset.favorite;
    const favorites = readFavorites();
    const nextFavorites = favorites.includes(routeName)
      ? favorites.filter((favorite) => favorite !== routeName)
      : [...favorites, routeName];
    localStorage.setItem(favoritesKey, JSON.stringify(nextFavorites));
    updateRoutes();
  });

  updateRoutes();
}

function initializePlanner() {
  const plannerForm = document.querySelector('#planner-form');
  if (!plannerForm) return;

  const result = document.querySelector('#planner-result');
  const clearButton = document.querySelector('#clear-plan');

  function showSavedPlan() {
    const savedPlan = localStorage.getItem(plannerKey);
    if (!savedPlan) {
      result.textContent = '';
      clearButton.hidden = true;
      return;
    }

    try {
      const plan = JSON.parse(savedPlan);
      const experienceLabels = { new: 'new runner', returning: 'returning runner', regular: 'regular runner' };
      result.textContent = `Saved: ${plan.weeklyMinutes} comfortable minutes this week for a ${experienceLabels[plan.experience] ?? 'trail runner'}. Keep it easy and adjust to how you feel.`;
      clearButton.hidden = false;
    } catch {
      localStorage.removeItem(plannerKey);
      result.textContent = '';
      clearButton.hidden = true;
    }
  }

  plannerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!plannerForm.reportValidity()) return;
    const formData = new FormData(plannerForm);
    const plan = {
      experience: formData.get('experience'),
      weeklyMinutes: Number(formData.get('weeklyMinutes'))
    };
    localStorage.setItem(plannerKey, JSON.stringify(plan));
    showSavedPlan();
  });

  clearButton.addEventListener('click', () => {
    localStorage.removeItem(plannerKey);
    showSavedPlan();
  });

  showSavedPlan();
}

function initializeNavigation() {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-nav');
  if (!menuButton || !navigation) return;

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !isOpen);
  });
}

initializeNavigation();
initializeTrailFinder();
initializePlanner();