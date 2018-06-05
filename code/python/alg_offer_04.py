
def search(arr, data):

    # 输入参数类型判断
    if not isinstance(arr, list) or not isinstance(data, int):
        return False

    rows = len(arr) - 1
    columns = 0
    
    result = False

    while rows >= 0 and columns < len(arr[0]):
        # 该列是否为数组
        if not isinstance(arr[rows], list):
            rows -= 1
            pass

        if data == arr[rows][columns]: 
            result = True
            break
        elif data < arr[rows][columns]: 
            rows -= 1
        else:
            columns += 1   

    return result


array = [
    [1, 2, 8 ,9], 
    [2, 4, 9, 12], 
    [4, 7, 10, 13], 
    [6, 8, 11 ,15]]

print('search 7 result (true) :\n', search(array, 7))
print('search 5 result (false) :\n', search(array, 5))
print('search 100 result (超出范围) :\n', search(array, 100))
print('search & result (特殊字符) :\n', search(array, '&'))