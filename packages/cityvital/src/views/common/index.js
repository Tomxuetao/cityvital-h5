import {
  Tab,
  Tabs,
  List,
  Popup,
  Search,
  Sticky,
  Loading,
  Cascader,
  ActionSheet,
  ConfigProvider
} from 'vant'

import EmptyPage from './empty-page.vue'
import CommonTabs from './common-tabs.vue'
import CommonList from './common-list.vue'
import CustomList from './custom-list.vue'
import ThirdFilter from './third-filter.vue'
import CommonTitle from './common-title.vue'
import CommonSheet from './common-sheet.vue'
import CommonSearch from './common-search.vue'
import CommonCalendar from './common-calendar.vue'
import CommonCascader from './common-cascader.vue'

export default (app) => {
  app.component(Tab.name, Tab)
  app.component(Tabs.name, Tabs)
  app.component(List.name, List)
  app.component(Popup.name, Popup)
  app.component(Search.name, Search)
  app.component(Sticky.name, Sticky)
  app.component(Loading.name, Loading)
  app.component(Cascader.name, Cascader)
  app.component(ActionSheet.name, ActionSheet)
  app.component(ConfigProvider.name, ConfigProvider)

  app.component('empty-page', EmptyPage)
  app.component('common-tabs', CommonTabs)
  app.component('common-list', CommonList)
  app.component('custom-list', CustomList)
  app.component('third-filter', ThirdFilter)
  app.component('common-title', CommonTitle)
  app.component('common-sheet', CommonSheet)
  app.component('common-search', CommonSearch)
  app.component('common-calendar', CommonCalendar)
  app.component('common-cascader', CommonCascader)
}
