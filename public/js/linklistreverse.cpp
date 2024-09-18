#include <iostream>
using namespace std;

struct Node
{
    int data;
    Node *next;
};

void reverse(Node *node)
{
    Node *prev = NULL;
    Node *current = node;
    Node *next;

    while (current != NULL)
    {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }

    node = prev;
}

void printList(Node *node)
{
    while (node != NULL)
    {
        cout << node->data << " ";
        node = node->next;
    }
    cout << endl;
}

int main()
{
    Node *head = new Node();
    head->data = 1;
    Node *second = new Node();
    second->data = 2;
    Node *third = new Node();
    third->data = 3;
    Node *fourth = new Node();
    fourth->data = 4;
    Node *fifth = new Node();
    fifth->data = 5;

    head->next = second;
    second->next = third;
    third->next = fourth;
    fourth->next = fifth;

    cout << "Original List: ";
    printList(head);

    reverse(head);
    cout << endl;
    printList(head);
}