import Ember from 'ember';
const {isEmpty, isPresent} = Ember;

export default Ember.Mixin.create({
  init() {
    this._super(...arguments);
    this.initializePerfecScrollArray();
  },

  initializePerfecScrollArray() {
    this.set('perfectScrollIds', Ember.A());
  },

  getPerfectScrollElement(perfectScrollId) {
    if (isEmpty(this.get('perfectScrollIds'))) {
      return null;
    }

    if (isEmpty(perfectScrollId)) {
      perfectScrollId = this.get('perfectScrollIds')[0];
    }

    return document.getElementById(perfectScrollId);
  },

  updatePerfectScroll(perfectScrollId) {
    let perfectScrollElement = this.getPerfectScrollElement(perfectScrollId);

    if (isPresent(perfectScrollElement)) {
      window.Ps.update(perfectScrollElement);
    }
  },

  performScroll(scrollLeft, scrollTop, perfectScrollId) {
    let perfectScrollElement = this.getPerfectScrollElement(perfectScrollId);

    if (isEmpty(perfectScrollElement)) {
      return;
    }

    if (isPresent(scrollLeft)) {
      perfectScrollElement.scrollLeft = scrollLeft;
    }

    if (isPresent(scrollTop)) {
      perfectScrollElement.scrollTop = scrollTop;
    }
  },

  actions: {
    lifeCycleEventOccurred(perfectScrollId, eventName) {
      eventName === 'initialized' ? this.get('perfectScrollIds').pushObject(perfectScrollId) :  this.get('perfectScrollIds').removeObject(perfectScrollId);
    },
  }
});
