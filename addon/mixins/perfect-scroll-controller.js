import Ember from 'ember';

const { get, isEmpty, isPresent } = Ember;

export default Ember.Mixin.create({
  init() {
    this._super(...arguments);

    this.initializePerfecScrollArray();
  },

  initializePerfecScrollArray() {
    this.set('perfectScrolls', new Map());
  },

  getPerfectScroll(perfectScrollId) {
    if (isEmpty(this.get('perfectScrolls'))) {
      return null;
    }

    if (isEmpty(perfectScrollId)) {
      return this.get('perfectScrolls').values().next().value;
    }

    return this.get('perfectScrolls').get(perfectScrollId);
  },

  updatePerfectScroll(perfectScrollId) {
    let perfectScroll = this.getPerfectScroll(perfectScrollId);

    if (isPresent(perfectScroll)) {

      perfectScroll.update();
    }
  },

  performScroll(scrollLeft, scrollTop, perfectScrollId) {
    let perfectScroll = this.getPerfectScroll(perfectScrollId);

    if (isEmpty(perfectScroll)) {
      return;
    }

    if (isPresent(scrollLeft)) {
      perfectScroll.element.scrollLeft = scrollLeft;
    }

    if (isPresent(scrollTop)) {
      perfectScroll.element.scrollTop = scrollTop;
    }
  },

  actions: {
    lifeCycleEventOccurred(scrollId, perfectScroll, eventName) {
      if (eventName === 'initialized') {
        get(this, 'perfectScrolls').set(scrollId, perfectScroll);
      } else {
        get(this, 'perfectScrolls').delete(scrollId);
      }
    }
  }
});
