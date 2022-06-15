import AppMiniCard from "../components/apps/app-mini-card";

export default function loadMoreApps(apps, amount) {
  let size;

  if (apps.length < amount) {
    size = apps.length;
  } else {
    size = amount;
  }

  let component = [];
  for (let i = 0; i < size; i++) {
    component.push(
      <AppMiniCard
        key={apps[i].id}
        name={apps[i].name}
        description={apps[i].description}
        category={apps[i].category}
        id={apps[i].id}
      />
    );
  }

  return component;
}
