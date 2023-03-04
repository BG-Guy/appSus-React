export const storageService = {
  query,
  get,
  post,
  update,
  remove,
  postMany,
};

async function query(entityType) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || [];
  return await Promise.resolve(entities);
}

async function get(entityType, entityId) {
  var entities = await query(entityType).then((mails) => {
    return mails;
  });
  const entity = entities.find((entity) => {
    return entity.id === entityId;
  });
  console.log("🚀 ~ file: storage.service.js:22 ~ entity ~ entity", entity);
  return entity;
}

function post(entityType, newEntity, entities) {
  newEntity.id = _makeId();
  entities.push(newEntity);
  _save(entityType, entities);
  return entities;
}

async function postMany(entityType, newEntities) {
  const oldEntities = query(entityType);
  const updatedEntities = oldEntities.concat(newEntities);
  localStorage.setItem(entityType, updatedEntities);
}

async function update(entityType, updatedEntity) {
  const oldEntities = await query(entityType);
  const idx = oldEntities.findIndex((entity) => entity.id === updatedEntity.id);
  oldEntities.splice(idx, 1, updatedEntity);

  _save(entityType, oldEntities);

  return oldEntities;
}

// Remove entity from entities array
async function remove(entityType, entityId) {
  const entities = await query(entityType);
  const entityToRemoveIdx = entities.findIndex(
    (entity) => entity.id === entityId
  );

  await entities.splice(entityToRemoveIdx, 1);

  _save(entityType, entities);
  return entities;
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 8) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
