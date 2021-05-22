const mongoose = require('mongoose')
const cfg = require('./cfg/default')
const ItemList = require('./models/Item')
const ItemInfo = require('./models/Info')

mongoose.connect(cfg.mongodbConnectUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => {
    //getTreeItem.forEach(saveItem)
    generateDescr().forEach(saveInfo)
  })
  .catch(err => console.log(err))

async function saveItem(e) {
  const item = await new ItemList({
    id: e.id,
    parentId: e.parentId,
    name: e.name
  }).save()
  console.log(`${e.id} el saved`)
}

async function saveInfo(e) {
  try {
    const item = await new ItemInfo({
      id: e.id,
      description: e.description,
      size: e.size,
      relation: e.relation,
      visibility: e.visibility,
      color: e.color
    }).save()
    console.log(`${e.id} el saved`)
  } catch (e) {
    console.log(e)
  }

}

function generateDescr() {
  return Array(24)
    .fill(" ")
    .reduce((r, _, i) => {
      const item = {};
      const color = Math.random();
      item["id"] = Number(i + 1);
      item["description"] = `Cгенерированное описание для ${i + 1} элемента`;
      item["size"] = `${Math.ceil(Math.random() * 10)} м.`;
      item["relation"] = Math.random() > 0.5 ? "Позитивное" : "Негативное";
      item["visibility"] = Math.random() > 0.5 ? "Прозрачный" : "Непрозрачный";
      switch (true) {
        case color < 0.1:
          item["color"] = "Красный";
          break;
        case color < 0.2:
          item["color"] = "Зеленый";
          break;
        case color < 0.3:
          item["color"] = "Желтый";
          break;
        case color < 0.4:
          item["color"] = "Фиолетовый";
          break;
        case color < 0.5:
          item["color"] = "Оранжевый";
          break;
        case color < 0.6:
          item["color"] = "Черный";
          break;
        case color < 0.7:
          item["color"] = "Коричневый";
          break;
        case color < 0.8:
          item["color"] = "Цвет морской волны";
          break;
        case color < 0.9:
          item["color"] = "Сиреневый";
          break;
        default:
          item["color"] = "Без цвета";
          break;
      }
      r.push(item);
      return r;
    }, [])
}

function getTreeItem() {
  return [
    {
      id: 1,
      parentId: null,
      name: 'Корневой элемент 1'
    },
    {
      id: 2,
      parentId: null,
      name: 'Корневой элемент 2'
    },
    {
      id: 3,
      parentId: null,
      name: 'Корневой элемент 3'
    },
    {
      id: 4,
      parentId: null,
      name: 'Корневой элемент 4'
    },
    {
      id: 5,
      parentId: null,
      name: 'Корневой элемент 5'
    },
    {
      id: 6,
      parentId: 1,
      name: 'Элемент №1 корневого элемента 1'
    },
    {
      id: 7,
      parentId: 1,
      name: 'Элемент №2 корневого элемента 1'
    },
    {
      id: 8,
      parentId: 1,
      name: 'Элемент №3 корневого элемента 1'
    },
    {
      id: 9,
      parentId: 2,
      name: 'Элемент №1 корневого элемента 2'
    },
    {
      id: 10,
      parentId: 2,
      name: 'Элемент №2 корневого элемента 2'
    },
    {
      id: 11,
      parentId: 2,
      name: 'Элемент №3 корневого элемента 2'
    },
    {
      id: 12,
      parentId: 5,
      name: 'Элемент №1 корневого элемента 5'
    },
    {
      id: 13,
      parentId: 5,
      name: 'Элемент №2 корневого элемента 5'
    },
    {
      id: 14,
      parentId: 5,
      name: 'Элемент №3 корневого элемента 5'
    },
    {
      id: 15,
      parentId: 3,
      name: 'Элемент №1 корневого элемента 3'
    },
    {
      id: 16,
      parentId: 3,
      name: 'Элемент №2 корневого элемента 3'
    },
    {
      id: 17,
      parentId: 4,
      name: 'Элемент №1 корневого элемента 4'
    },
    {
      id: 18,
      parentId: 1,
      name: 'Элемент №4 корневого элемента 1'
    },
    {
      id: 19,
      parentId: 6,
      name: 'Элемент №1 элемента №1 корневого элемента 1'
    },
    {
      id: 20,
      parentId: 6,
      name: 'Элемент №2 элемента №1 корневого элемента 1'
    },
    {
      id: 21,
      parentId: 6,
      name: 'Элемент №3 элемента №1 корневого элемента 1'
    },
    {
      id: 22,
      parentId: 10,
      name: 'Элемент №1 элемента №2 корневого элемента 2'
    },
    {
      id: 23,
      parentId: 4,
      name: 'Элемент №1 корневого элемента 4'
    },
    {
      id: 24,
      parentId: 22,
      name: 'Элемент №1 элемента №1 элемента №2 корневого элемента 2'
    }
  ]
}
