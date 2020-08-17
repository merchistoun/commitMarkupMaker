const n = "\n";

const createMarkup = (
  title,
  content,
  reason,
  checkItems,
  tested,
  jira,
  exceptions
) => {
  var markup = `## Overview${n}${n}`;

  markup += `## ${title}${n}${n}`;

  content.split("\n").forEach((contentLine) => {
    markup += `- ${contentLine}${n}${n}`;
  });

  markup += `### Why the Change is Needed${n}${n}`;
  reason.split("\n").forEach((reasonLine) => {
    markup += `${reasonLine}${n}`;
  });

  markup += `${n}### Type of Change${n}Tick the applicable items:${n}${n}`;

  checkItems.forEach((checkItem) => {
    markup += `    [${checkItem.get() ? "X" : " "}] ${checkItem.label}${n}`;
  });

  markup += `${n}### How the Change has been Tested${n}`;
  tested.split("\n").forEach((testedLine) => {
    markup += `${testedLine}${n}`;
  });

  markup += `${n}### Jira URL${n}`;
  markup += `[https://cloudbooking.atlassian.net/browse/${jira}](https://cloudbooking.atlassian.net/browse/${jira})`;

  markup += `${n}${n}### Exceptions${n}`;
  if (exceptions) {
    exceptions.split("\n").forEach((exceptionLine) => {
      markup += `${exceptionLine}${n}`;
    });
  } else {
    markup += "N/A";
  }

  return markup;
};

export default createMarkup;
