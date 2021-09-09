// @flow
import React from 'react';
import {
  View,
  Text,
  Avatar,
  AvatarHelper,
  TextField,
  Button,
} from 'react-native-ui-lib';
import { ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { ScrollView, TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../styles';
import { Header, Icon } from '../../components';

type Props = {};

const styles = StyleSheet.create({
  fab: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 4,
    backgroundColor: colors.blue,
  }
});

const getTitleHeader = (isView, isEdit) => {
  if (isView) return `${isView.firstName} ${isView.lastName}`;
  if (isEdit) {
    let name = `${isEdit.firstName} ${isEdit.lastName}`;
    if (name.length > 25) {
      name = `${name.substr(0, 25)}...`;
    }
    return `Editing ${name}`;
  }
  return 'Add new contact';
};

export default (props: Props) => {
  const {
    navigation,
    firstName,
    lastName,
    age,
    photo,
    id,
    errors,
    setFirstName,
    setLastName,
    setAge,
    submit,
    loading,
    enableEdit,
    editMode,
    deleteContact,
  } = props;
  const isView = navigation.getParam('view', false) && !editMode ? navigation.getParam('view', false) : false;
  const isEdit = editMode ? navigation.getParam('view', false) : false;
  return (
    <View flex>
      <Header
        title={getTitleHeader(isView, isEdit)}
        color={colors.blue}
        textColor={colors.white}
        rightComponent={(
          <TouchableNativeFeedback
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={navigation.goBack}
          >
            <Icon name="close" type="MaterialCommunityIcons" size={28} color={colors.white} />
          </TouchableNativeFeedback>
        )}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View
          centerV
          centerH
          style={{
            backgroundColor: colors.primary,
            minHeight: 150,
          }}
        >
          <Avatar
            imageSource={photo ? { uri: photo } : null}
            label={AvatarHelper.getInitials(`${firstName} ${lastName}`)}
            size={80}
          />
        </View>
        <View padding-16>
          <TextField
            editable={!isView}
            floatingPlaceholder
            placeholder="First Name"
            enableErrors
            maxLength={40}
            value={firstName}
            error={!errors.firstName ? '' : errors.firstName}
            onChangeText={setFirstName}
          />
          <TextField
            editable={!isView}
            floatingPlaceholder
            placeholder="Last Name"
            enableErrors
            maxLength={40}
            value={lastName}
            error={!errors.lastName ? '' : errors.lastName}
            onChangeText={setLastName}
          />
          <TextField
            editable={!isView}
            floatingPlaceholder
            placeholder="Age"
            enableErrors
            keyboardType="numeric"
            maxLength={3}
            value={age.toString()}
            error={!errors.age ? '' : errors.age}
            onChangeText={setAge}
          />
        </View>
        {
          isView ? null
            : (
              <View bottom center padding-16>
                <View flex row center>
                  {
                    !isEdit ? null
                      : (
                        <View marginH-8 style={{ flex: 0.3 }}>
                          <Button
                            disabled={loading}
                            label="Delete"
                            backgroundColor={colors.red}
                            color={loading ? colors.gray : colors.white}
                            onPress={() => {
                              Alert.alert(
                                'Delete Contact',
                                `Delete ${firstName} ${lastName}?`,
                                [
                                  {
                                    text: 'Cance',
                                  },
                                  {
                                    text: 'Delete',
                                    onPress: () => deleteContact({
                                      firstName,
                                      lastName,
                                      age,
                                      photo,
                                      id,
                                    }),
                                  },
                                ]
                              );
                            }}
                          >
                            {loading
                              ? (
                                <ActivityIndicator
                                  color={colors.white}
                                  style={{ marginRight: 8 }}
                                />
                              )
                              : null}
                          </Button>
                        </View>
                      )
                  }
                  <View marginH-8 style={{ flex: 0.3 }}>
                    <Button
                      disabled={loading}
                      label="Submit"
                      backgroundColor={colors.primary}
                      color={loading ? colors.gray : colors.white}
                      onPress={() => submit({
                        firstName,
                        lastName,
                        age,
                        photo,
                        id,
                      })}
                    >
                      {loading
                        ? <ActivityIndicator color={colors.white} style={{ marginRight: 8 }} />
                        : null}
                    </Button>
                  </View>
                </View>
                {
                  errors.submit !== ''
                    ? (
                      <View marginV-16>
                        <Text red center>{errors.submit}</Text>
                      </View>
                    )
                    : null
                }
              </View>
            )
        }
      </ScrollView>
      {
        editMode ? null
          : (
            <View
              style={[
                {
                  position: 'absolute',
                  bottom: 20,
                  right: 20,
                },
                styles.fab
              ]}
            >
              <TouchableOpacity
                style={styles.fab}
                onPress={enableEdit}
                disabled={loading}
              >
                <Icon name="pencil" type="MaterialCommunityIcons" size={28} color={colors.white} />
              </TouchableOpacity>
            </View>
          )
      }
    </View>
  );
};
