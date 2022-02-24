import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modal: { padding: 0, margin: 0 },
  closeBtn: {
    position: 'absolute',
    top : 45,
    right: 15,
  },
  closeBtnLeftHand: {
    position: 'absolute',
    top : 45,
    left: 15,
  },
  thumbnailBorder: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  itemContainer: {
    height: '100%',
    flexWrap: 'wrap',
    overflow: 'hidden',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'center',
    paddingTop: 15,
  },
});
