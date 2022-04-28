// Import Given, When, Then from wdio/cucumber
const { Given, When, Then } = require('@wdio/cucumber-framework');
const pauseTime = 0;

// The "Given that I am on the start page" step
// is already already written in another file

When(/^I enter the text "([^"]*)" in the filter$/, async filterText => {

  let filterFieldEl = await $('[placeholder="Filter by author name"]');
  await filterFieldEl.setValue(filterText);
  await browser.pause(pauseTime);
});

Then(/^the only authors displayed should be "([^"]*)"$/, async expectedAuthors => {
  // Convert to array of author names
  expectedAuthors = expectedAuthors.split(', ');

  // Get all author name elements
  let authorNameEls = await $$('.author-list .author-name');

  // Get all displayed author names;
  let displayedAuthors = [];
  for (let nameEl of authorNameEls) {
    displayedAuthors.push(await nameEl.getText());
  }

  // Sort and convert to strings for easy comparison
  expectedAuthors = expectedAuthors.sort().join(' ');
  displayedAuthors = displayedAuthors.sort().join(' ');

  expect(displayedAuthors).toEqual(expectedAuthors);

  await browser.pause(pauseTime);

});