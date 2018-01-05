function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

/**
 * TODO: complete the last 2 transformation: SulfurasAgingTransformer and BackstagePassAgingTransformer.
 */
function update_quality() {
  items.map((item) => {
    switch (item.name) {
      case 'Sulfuras, Hand of Ragnaros':
        new AgingTransformer().transform(item);
//        new SulfurasAgingTransformer().transform(item);
        break;
      case 'Aged Brie':
        new AgedBrieAgingTransformer().transform(item);
        break;
      case 'Backstage passes to a TAFKAL80ETC concert':
        new AgingTransformer().transform(item);
//        new  BackstagePassAgingTransformer().transform(item);
        break;
      case 'Conjured Mana Cake':
        new ConjuredAgingTransformer().transform(item);
        break;
      default:
        // all other, common products
        new AgingTransformer().transform(item);
    }
  });
}

/**
 * Common class. Hopefully there are enough products sharing common value/quality transformation
 * to justify deriving subclasses from it...
 */
class AgingTransformer {
  transformSellIn(item) {
    item.sell_in -= 1;
  }
  transformQualityValue(item) {
    if (item.quality === 0) {
      return;
    }
    item.quality = (item.sell_in === 0) ? item.quality - 2 : item.quality - 1;
  }
  transform(item) {
    // first update quality and only then sell-in value. otherwise we'll err in the quality calculation
    this.transformQualityValue(item);
    this.transformSellIn(item);
  }
}
class ConjuredAgingTransformer extends AgingTransformer {
  transformQualityValue(item) {
    if (item.quality === 0) {
      return;
    }
    item.quality = (item.sell_in === 0) ? item.quality - 4 : item.quality - 2;
  }
  transform(item) {
    // first update quality and only then sell-in value. otherwise we'll err in the quality calculation
    this.transformQualityValue(item);
    this.transformSellIn(item);
  }
}
class AgedBrieAgingTransformer extends AgingTransformer {
  transformQualityValue(item) {
    if (item.quality === 50) {
      return;
    }
    item.quality += 1;
  }
  transform(item) {
    // first update quality and only then sell-in value. otherwise we'll err in the quality calculation
    this.transformQualityValue(item);
    this.transformSellIn(item);
  }
}

function update_quality_OLD() {
  for (var i = 0; i < items.length; i++) {
    if (items[i].name !== 'Aged Brie' && items[i].name !== 'Backstage passes to a TAFKAL80ETC concert') {
      if (items[i].quality > 0) {
        if (items[i].name !== 'Sulfuras, Hand of Ragnaros') {
          items[i].quality = items[i].quality - 1
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
        }
      }
    }
    if (items[i].name !== 'Sulfuras, Hand of Ragnaros') {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].name !== 'Aged Brie') {
        if (items[i].name !== 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality > 0) {
            if (items[i].name !== 'Sulfuras, Hand of Ragnaros') {
              items[i].quality = items[i].quality - 1
            }
          }
        } else {
          // a bug. if quality is never < 0 the result of this would be 0. should be:
          // items[i].quality -= 2, though it's not well defined by HOW MUCH quality should decline every day.
          // per above code, it seems like by 1, so here should be by 2
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }
}
