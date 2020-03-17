import ListenerManager from '../src/listener-manager';
import { createHTMLForListenerManager } from './test-common';

describe('ListenerManager', () => {
  describe('addListener()', () => {
    test('addListener with listener name', (done) => {

      const lm = new ListenerManager();
      createHTMLForListenerManager();
      const listenerName = 'my-test-listener';
      const btn = document.querySelector('#myButton');
      const result = lm.addListener(btn, 'click', (event) => {
        expect(event.target.id)
          .toBe('myButton');
        done();
      }, listenerName);

      expect(result.success)
        .toBe(true);
      expect(result.listenerName)
        .toBe(listenerName);

      btn.click();
    });

    test('addListener add anonymous listener', (done) => {

      const lm = new ListenerManager();
      createHTMLForListenerManager();
      const btn = document.querySelector('#myButton');
      const result = lm.addListener(btn, 'click', (event) => {
        expect(event.target.id)
          .toBe('myButton');
        done();
      });
      expect(result.success)
        .toBe(true);
      expect(result.listenerName)
        .toEqual(expect.anything());

      btn.click();

    });

  });

  describe('removeListener()', () => {
    test('remove named listener', (done) => {

      const lm = new ListenerManager();
      createHTMLForListenerManager();
      const listenerName = 'my-test-listener';
      const btn = document.querySelector('#myButton');
      lm.addListener(btn, 'click', () => {
        throw new Error('Listener is not removed!');
      }, listenerName);
      lm.removeListener(btn, 'click', listenerName);
      btn.click();

      setTimeout(() => {
        done();
      }, 100);
    });
    test('remove non-existing listener by eventName', () => {

      const lm = new ListenerManager();
      createHTMLForListenerManager();
      const listenerName = 'my-test-listener';
      const btn = document.querySelector('#myButton');
      const btn2 = document.querySelector('#myButton2');
      lm.addListener(btn, 'click', () => {
        throw new Error('Listener is not removed!');
      }, listenerName);


      //To remove non-exist element
      {
        const result = lm.removeListener(btn2, 'click', listenerName);
        expect(result.success)
          .toBe(false);
        expect(result.message)
          .toBe('DOM element [object HTMLButtonElement](id=myButton2) doesn\'t have any listeners.');
      }
      //To remove non-exist eventName
      {
        const result = lm.removeListener(btn, 'hover', listenerName);

        expect(result.success)
          .toBe(false);
        expect(result.message)
          .toBe('DOM element [object HTMLButtonElement](id=myButton) doesn\'t have "hover" listeners.');

      }
      //To remove non-exist eventName
      {
        const result = lm.removeListener(btn, 'click', 'foo');
        expect(result.success)
          .toBe(false);
        expect(result.message)
          .toBe('DOM element [object HTMLButtonElement](id=myButton) doesn\'t have "click" listener "foo"');
      }

    });
  });
});
