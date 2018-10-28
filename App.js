import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';
import GridView from 'react-native-super-grid';
import RecyclerviewList, { DataSource } from 'react-native-recyclerview-list';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'; 

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2
};

let containerCount = 0;

class CellContainer extends React.Component {
  constructor(args) {
      super(args);
      this._containerId = containerCount++;
  }
  render() {
      return <View {...this.props}>{this.props.children}<Text>Cell Id: {this._containerId}</Text></View>;
  }
}

/* var rawData = [
  { id: 1, text: 'Item #1' },
  { id: 2, text: 'Item #2' },
  { id: 3, text: 'Item #3' },
  { id: 4, text: 'Item #4' },
  { id: 5, text: 'Item #5' }
]; */

// var dataSource = new DataSource(rawData, (item, index) => item.id);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class GridViewTest extends React.Component{
  constructor(args) {
    super(args);

    let { width } = Dimensions.get("window");
    
    let dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    this._layoutProvider = new LayoutProvider(
      index => {
        if (index % 3 === 0) {
          return ViewTypes.FULL;
        } else if (index % 3 === 1) { 
          return ViewTypes.HALF_LEFT;
        } else {
          return ViewTypes.HALF_RIGHT;
        }
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.HALF_LEFT:
            dim.width = width / 2;
            dim.height = 160;
            break;
          case ViewTypes.HALF_RIGHT:
            dim.width = width / 2;
            dim.height = 160;
            break;
          case ViewTypes.FULL:
            dim.width = width;
            dim.height = 140;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      }
    );

    this._rowRenderer = this._rowRenderer.bind(this);

    this.state = {
      dataProvider: dataProvider.cloneWithRows(this._generateArray(300))
    };
  }

  _generateArray(n) {
    let arr = new Array(n);
    for (let i = 0; i < n; i++) {
        arr[i] = i;
    }
    return arr;
}

  _rowRenderer(type, data) {
    switch (type) {
      case ViewTypes.HALF_LEFT:
        return (
          <CellContainer style={styles.containerGridLeft}>
            <Text>Data: {data}</Text>
          </CellContainer>
        );
      case ViewTypes.HALF_RIGHT:
          return (
            <CellContainer style={styles.containerGridRight}>
              <Text>Data: {data}</Text>
            </CellContainer>
        );
      case ViewTypes.FULL:
            return (
              <CellContainer style={styles.container}>
                <Text>Data: {data}</Text>
              </CellContainer>
        );
      default:
            return null;
    }
  }

  render() {
    return <RecyclerListView layoutProvider={this._layoutProvider} dataProvider={this.state.dataProvider} rowRenderer={this._rowRenderer} />;
  }


/*   render() {
    const items = [
      { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
      { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
      { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
      { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
      { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
      { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
      { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
      { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
      { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
      { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
    ];

    return(
      <GridView
        itemDimension = {130}
        items = {items}
        style = {styles.GridView}
        renderItem = {item => (
          <View style = {[styles.itemContainer, { backgroundColor: item.code }]}>
            <Text style = {styles.itemName}>{item.name} </Text>
            <Text style = {styles.itemCode}>{item.code}</Text>
          </View>
        )}
        />
    );
  }

  render() {
    return (
      <RecyclerviewList
        style={{ flex: 1 }}
        dataSource={dataSource}
        renderItem={({item, index}) => (
          <Text>{item.text} - {index}</Text>
        )} />
    );
  } */
}

const styles = {
  container: {
      justifyContent: "space-around",
      alignItems: "center",
      flex: 1,
      backgroundColor: "#00a1f1"
  },
  containerGridLeft: {
      justifyContent: "space-around",
      alignItems: "center",
      flex: 1,
      backgroundColor: "#ffbb00"
  },
  containerGridRight: {
      justifyContent: "space-around",
      alignItems: "center",
      flex: 1,
      backgroundColor: "#7cbb00"
  }
};

/* const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});  */
