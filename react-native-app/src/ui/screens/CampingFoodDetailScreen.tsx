import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';

import { UserInfo } from 'src/ui/components/molecules/UserInfo';
import { User, userList } from 'src/domain/models/user';
import { Food, foodList } from 'src/domain/models/food';
import { FoodImage } from 'src/ui/components/atoms/FoodImage';

import constant from 'src/i18n/ja.json';

// レシピの分量追加しないと。
export const CampingFoodDetailScreen = (props: any) => {
  const { route } = props;
  const { food } = route.params;
  // 選択したレシピの投稿ユーザーのみを取得する
  // 配列1件のため変換したい
  const selectUserList: User[] = userList.filter((user) => user.userId === food.userId);
  // 表示対象以外のレシピを一覧表示する
  const otherFoodList: Food[] = foodList.filter((otherfood) => otherfood.key !== food.key);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.title}>
          <Text style={styles.titleText}>{food.title}</Text>
        </View>
        <View style={styles.foodImage}>
          <Swiper loop={false}>
            {food.foodImages.map((data: any) => (
              <Image
                key={data.key}
                style={styles.foodImage}
                resizeMode="stretch"
                source={data.image}
              />
            ))}
          </Swiper>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.body}>
            <Text style={styles.subTitle}>{constant.label.material}</Text>
            <View style={styles.textInfo}>
              {food.material.map((data: string) => (
                <Text key={data} style={styles.text}>
                  {constant.label.dot}
                  {data}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.body}>
            <Text style={styles.subTitle}>{constant.label.howToMake}</Text>
            <View style={styles.procedure}>
              {food.procedure.map((data: { key: string; text: string; image: { uri: string } }) => (
                <View key={data.key} style={styles.procedureInfo}>
                  <Text style={styles.step}>
                    {constant.label.step}
                    {data.key}
                  </Text>
                  <View style={styles.stepInfo}>
                    <View style={styles.stepText}>
                      <Text style={styles.text}>{data.text}</Text>
                    </View>
                    <View>
                      <Image style={styles.stepImage} resizeMode="cover" source={data.image} />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.body}>
            <Text style={styles.subTitle}>{constant.label.point}</Text>
            <View style={styles.textInfo}>
              <Text style={styles.text}>{food.point}</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.subTitle}>{constant.label.postUser}</Text>
          <UserInfo selectUserList={selectUserList} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.subTitle}>{constant.label.recommendedPost}</Text>
          <ScrollView horizontal style={styles.sideScroll} showsHorizontalScrollIndicator={false}>
            {otherFoodList.map((data: any) => (
              <View key={data.key}>
                <FoodImage food={data} style={styles.image} />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const ITEM_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '500',
  },
  foodImage: {
    width: '100%',
    height: 300,
  },

  bodyContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  body: {
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 5,
  },
  textInfo: {
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
    marginBottom: 5,
  },

  procedure: {
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  procedureInfo: {
    marginBottom: 5,
  },
  stepInfo: {
    flexDirection: 'row',
  },
  step: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 5,
  },
  stepImage: {
    width: ITEM_WIDTH * 0.4,
    height: 150,
  },
  stepText: {
    paddingHorizontal: 10,
    width: ITEM_WIDTH * 0.5,
  },

  footer: {
    paddingLeft: 10,
    paddingRight: 15,
    paddingVertical: 20,
  },

  imageContainer: {
    flex: 1,
  },
  listImage: {
    height: ITEM_WIDTH * 0.35,
    width: ITEM_WIDTH * 0.45,
  },

  sideScroll: {
    paddingVertical: 10,
  },

  image: {
    width: ITEM_WIDTH * 0.35,
  },
});
